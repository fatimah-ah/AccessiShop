import express from "express";
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  clearCart,
  updateItemQuantity
} from "../controllers/cartController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// All cart routes are protected
router.use(verifyToken);

// Get user's cart
router.get("/", getCart);

// Add product to cart
router.post("/add", addItemToCart);

// Remove product from cart
router.delete("/remove", removeItemFromCart);

// Update item quantity in cart
router.put("/update", updateItemQuantity);

// Clear cart
router.delete("/clear", clearCart);

export default router;
