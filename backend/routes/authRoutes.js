import express from "express";

import {
  signupUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();


// Signup
router.post("/signup", signupUser);


// Login
router.post("/login", loginUser);


// Forgot password
router.post(
  "/forgot-password",
  forgotPassword
);


// Reset password
router.post(
  "/reset-password/:token",
  resetPassword
);


export default router;