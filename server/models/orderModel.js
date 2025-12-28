import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            title: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            image: {
                type: String,
                required: true
            }
        }
    ],

    shippingInfo: {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        postalCode: {
            type: String,
            required: true,
            trim: true
        },
        country: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        }
    },

    paymentMethod: {
        type: String,
        required: true,
        enum: ["credit_card", "debit_card", "paypal", "cash_on_delivery"],
        default: "credit_card"
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending"
    },

    orderStatus: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending"
    },

    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },

    orderNumber: {
        type: String,
        unique: true,
        required: false
    },

    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,  // Adds createdAt and updatedAt
    collection: 'orders'
});

// Generate order number before saving
orderSchema.pre('save', async function () {
    if (!this.orderNumber) {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        this.orderNumber = `ORD-${timestamp}-${random}`;
    }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
