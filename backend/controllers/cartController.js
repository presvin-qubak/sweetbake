import Cart from "../models/Cart.js";


// ==================================================
// GET CART
// ==================================================

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [],
      });
    }

    res.status(200).json({
      success: true,
      cart: cart.items,
    });
  } catch (error) {
    console.error("Get cart error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get cart.",
    });
  }
};


// ==================================================
// ADD TO CART
// ==================================================

export const addToCart = async (req, res) => {
  try {
    const {
      productId,
      name,
      price,
      image,
      category,
      quantity = 1,
    } = req.body;

    if (!productId || !name || price === undefined || !image) {
      return res.status(400).json({
        success: false,
        message: "Product information is required.",
      });
    }

    let cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId === String(productId)
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({
        productId: String(productId),
        name,
        price: Number(price),
        image,
        category: category || "",
        quantity: Number(quantity),
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart.",
      cart: cart.items,
    });
  } catch (error) {
    console.error("Add cart error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add product to cart.",
    });
  }
};


// ==================================================
// UPDATE QUANTITY
// ==================================================

export const updateCartQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    const item = cart.items.find(
      (item) => item.productId === String(productId)
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart.",
      });
    }

    if (Number(quantity) <= 0) {
      cart.items = cart.items.filter(
        (item) => item.productId !== String(productId)
      );
    } else {
      item.quantity = Number(quantity);
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart quantity updated.",
      cart: cart.items,
    });
  } catch (error) {
    console.error("Update quantity error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update cart.",
    });
  }
};


// ==================================================
// REMOVE FROM CART
// ==================================================

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId !== String(productId)
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart.",
      cart: cart.items,
    });
  } catch (error) {
    console.error("Remove cart error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to remove product.",
    });
  }
};


// ==================================================
// CLEAR CART
// ==================================================

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared.",
      cart: [],
    });
  } catch (error) {
    console.error("Clear cart error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to clear cart.",
    });
  }
};