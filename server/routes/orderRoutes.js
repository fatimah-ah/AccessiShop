import express from "express";
import {
    createOrder,
    getUserOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus
} from "../controllers/orderController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// User order routes (protected)
router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getUserOrders);
router.get("/:id", verifyToken, getOrderById);

// Admin routes (protected + admin check in controller)
router.get("/admin/all", verifyToken, getAllOrders);
router.put("/:id/status", verifyToken, updateOrderStatus);

export default router;
