import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

/* ================= TEST ROUTE ================= */

app.get("/", (req, res) => {
  res.json({
    message: "Bakery backend is running!",
  });
});

/* ================= CONTACT ROUTE ================= */

app.use("/api/contact", contactRoutes);

/* ================= AUTH ROUTE ================= */

app.use("/api/auth", authRoutes);


app.use( "/api/wishlist",wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders",orderRoutes);
  


 


/* ================= MONGODB ================= */

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "MongoDB connection failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();