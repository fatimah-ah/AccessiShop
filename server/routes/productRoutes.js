import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

// Public routes
router.get("/", getAllProducts);        // list all products
router.get("/:id", getProductById);    // single product detail

// Admin routes - protected with admin middleware
router.post("/", verifyAdmin, createProduct);        // add product
router.put("/:id", verifyAdmin, updateProduct);     // update product
router.delete("/:id", verifyAdmin, deleteProduct);  // delete product

export default router;
