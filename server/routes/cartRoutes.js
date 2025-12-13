import express from "express";
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  clearCart
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
router.post("/remove", removeItemFromCart);

// Clear cart
router.post("/clear", clearCart);

export default router;
