import Cart from "../models/cartModel.js";

// ------------------------
// GET CART
// ------------------------
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");
    if (!cart) {
      cart = await Cart.create({ userId: req.user._id, items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ------------------------
// ADD ITEM TO CART
// ------------------------
export const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate required fields
    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product and quantity required" });
    }

    // Validate quantity
    if (typeof quantity !== 'number' || quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be a positive number" });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) cart = await Cart.create({ userId: req.user._id, items: [] });

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ------------------------
// REMOVE ITEM FROM CART
// ------------------------
export const removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(400).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    res.json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ------------------------
// CLEAR CART
// ------------------------
export const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(400).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();
    res.json({ message: "Cart cleared", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
