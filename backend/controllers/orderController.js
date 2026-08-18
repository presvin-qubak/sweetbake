import Order from "../models/Order.js";

// ==================================================
// CREATE ORDER
// ==================================================

export const createOrder = async (req, res) => {
  try {
    const {
      customer,
      items,
      paymentMethod,
      subtotal,
      delivery,
      total,
    } = req.body;

    // ================= AUTH =================

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User authentication required.",
      });
    }

    // ================= VALIDATION =================

    if (
      !customer ||
      !customer.name ||
      !customer.phone ||
      !customer.address ||
      !customer.city ||
      !customer.pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "Complete delivery information is required.",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    if (!["cod", "upi", "card"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method.",
      });
    }

    // ================= ORDER ID =================

    const orderId =
      "SB" +
      Date.now() +
      Math.floor(Math.random() * 1000);

    // ================= CREATE ORDER =================

    const order = await Order.create({
      orderId,

      user: req.user.id,

      customer,

      items,

      paymentMethod,

      subtotal: Number(subtotal),

      delivery: Number(delivery),

      total: Number(total),
    });

    // ================= RESPONSE =================

    return res.status(201).json({
      success: true,
      message: "Order placed successfully! 🎉",
      order,
    });

  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to place order.",
    });
  }
};


// ==================================================
// GET MY ORDERS
// ==================================================

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    console.error("Get orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get orders.",
    });
  }
};


// ==================================================
// GET SINGLE ORDER
// ==================================================

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({
      orderId,
      user: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("Get order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get order.",
    });
  }
};