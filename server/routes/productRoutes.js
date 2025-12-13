import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

// Public routes
router.get("/", getAllProducts);        // list all products
router.get("/:id", getProductById);    // single product detail

// Admin routes (later you can add auth middleware)
router.post("/", createProduct);        // add product
router.put("/:id", updateProduct);     // update product
router.delete("/:id", deleteProduct);  // delete product

export default router;
