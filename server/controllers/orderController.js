import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

/**
 * @desc    Create a new order from user's cart
 * @route   POST /api/orders
 * @access  Private
 */
export const createOrder = async (req, res) => {
    try {
        const { shippingInfo, paymentMethod, notes, selectedItemIds } = req.body;

        // 1. Validate shipping information
        if (!shippingInfo || !shippingInfo.fullName || !shippingInfo.email ||
            !shippingInfo.address || !shippingInfo.city ||
            !shippingInfo.postalCode || !shippingInfo.country) {
            return res.status(400).json({
                message: "Please provide complete shipping information"
            });
        }

        // 2. Validate payment method
        const validPaymentMethods = ["credit_card", "debit_card", "paypal", "cash_on_delivery"];
        if (!paymentMethod || !validPaymentMethods.includes(paymentMethod)) {
            return res.status(400).json({
                message: "Please provide a valid payment method"
            });
        }

        // 3. Get user's cart
        const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Your cart is empty. Please add items before placing an order."
            });
        }

        // 4. Determine which items to order
        let itemsToOrder = cart.items;

        // If selectedItemIds is provided, filter to only those items
        if (selectedItemIds && Array.isArray(selectedItemIds) && selectedItemIds.length > 0) {
            itemsToOrder = cart.items.filter(item =>
                selectedItemIds.includes(item.productId._id.toString())
            );

            if (itemsToOrder.length === 0) {
                return res.status(400).json({
                    message: "None of the selected items were found in your cart."
                });
            }
        }

        // 5. Validate all products exist and are in stock
        const orderItems = [];
        let totalAmount = 0;

        for (const item of itemsToOrder) {
            const product = item.productId;

            if (!product) {
                return res.status(404).json({
                    message: "One or more products in your cart no longer exist"
                });
            }

            // Check stock availability
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for ${product.title}. Available: ${product.stock}`
                });
            }

            // Add to order items with current price
            orderItems.push({
                productId: product._id,
                title: product.title,
                price: product.price,
                quantity: item.quantity,
                image: product.image
            });

            totalAmount += product.price * item.quantity;
        }

        // 6. Create the order
        const order = await Order.create({
            userId: req.user._id,
            items: orderItems,
            shippingInfo,
            paymentMethod,
            totalAmount,
            notes: notes || ""
        });

        // 7. Update product stock
        for (const item of itemsToOrder) {
            await Product.findByIdAndUpdate(
                item.productId._id,
                { $inc: { stock: -item.quantity } }
            );
        }

        // 8. Remove ordered items from cart (not all items, only ordered ones)
        if (selectedItemIds && Array.isArray(selectedItemIds) && selectedItemIds.length > 0) {
            // Remove only selected items
            cart.items = cart.items.filter(item =>
                !selectedItemIds.includes(item.productId._id.toString())
            );
        } else {
            // If no selection, clear entire cart (backward compatibility)
            cart.items = [];
        }
        await cart.save();

        // 9. Populate user info and return
        const populatedOrder = await Order.findById(order._id).populate("userId", "name email");

        res.status(201).json({
            message: "Order placed successfully!",
            order: populatedOrder
        });

    } catch (error) {
        console.error("Create order error:", error);
        res.status(500).json({
            message: "Failed to create order. Please try again.",
            error: error.message
        });
    }
};

/**
 * @desc    Get all orders for the logged-in user
 * @route   GET /api/orders
 * @access  Private
 */
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
            .populate("userId", "name email")
            .sort({ createdAt: -1 }); // Most recent first

        res.json({
            count: orders.length,
            orders
        });

    } catch (error) {
        console.error("Get user orders error:", error);
        res.status(500).json({
            message: "Failed to retrieve orders",
            error: error.message
        });
    }
};

/**
 * @desc    Get a specific order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("userId", "name email")
            .populate("items.productId", "title category");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Ensure user can only access their own orders
        if (order.userId._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to view this order"
            });
        }

        res.json(order);

    } catch (error) {
        console.error("Get order by ID error:", error);
        res.status(500).json({
            message: "Failed to retrieve order",
            error: error.message
        });
    }
};

/**
 * @desc    Get all orders (Admin only)
 * @route   GET /api/orders/admin/all
 * @access  Private/Admin
 */
export const getAllOrders = async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admin privileges required."
            });
        }

        const orders = await Order.find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        res.json({
            count: orders.length,
            orders
        });

    } catch (error) {
        console.error("Get all orders error:", error);
        res.status(500).json({
            message: "Failed to retrieve orders",
            error: error.message
        });
    }
};

/**
 * @desc    Update order status (Admin only)
 * @route   PUT /api/orders/:id/status
 * @access  Private/Admin
 */
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus, paymentStatus } = req.body;

        // Check if user is admin
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admin privileges required."
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Update status fields if provided
        if (orderStatus) {
            const validOrderStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
            if (!validOrderStatuses.includes(orderStatus)) {
                return res.status(400).json({ message: "Invalid order status" });
            }
            order.orderStatus = orderStatus;
        }

        if (paymentStatus) {
            const validPaymentStatuses = ["pending", "paid", "failed", "refunded"];
            if (!validPaymentStatuses.includes(paymentStatus)) {
                return res.status(400).json({ message: "Invalid payment status" });
            }
            order.paymentStatus = paymentStatus;
        }

        await order.save();

        res.json({
            message: "Order status updated successfully",
            order
        });

    } catch (error) {
        console.error("Update order status error:", error);
        res.status(500).json({
            message: "Failed to update order status",
            error: error.message
        });
    }
};
