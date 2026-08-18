import express from "express";

import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// GET CART

router.get(
  "/",
  authMiddleware,
  getCart
);


// ADD PRODUCT

router.post(
  "/",
  authMiddleware,
  addToCart
);


// UPDATE QUANTITY

router.put(
  "/:productId",
  authMiddleware,
  updateCartQuantity
);


// REMOVE PRODUCT

router.delete(
  "/:productId",
  authMiddleware,
  removeFromCart
);


// CLEAR CART

router.delete(
  "/",
  authMiddleware,
  clearCart
);


export default router;