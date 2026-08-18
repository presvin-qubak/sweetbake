import Wishlist from "../models/Wishlist.js";


// ================= GET WISHLIST =================

export const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({
      user: req.user.id,
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        items: [],
      });
    }

    res.status(200).json({
      success: true,
      wishlist: wishlist.items,
    });

  } catch (error) {
    console.error(
      "Get wishlist error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to get wishlist.",
    });
  }
};


// ================= ADD TO WISHLIST =================

export const addToWishlist = async (req, res) => {
  try {
    const {
      id,
      name,
      price,
      image,
      category,
    } = req.body;

    if (!id || !name || !price || !image) {
      return res.status(400).json({
        success: false,
        message: "Product information is incomplete.",
      });
    }

    let wishlist = await Wishlist.findOne({
      user: req.user.id,
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        items: [],
      });
    }


    // Check duplicate
    const alreadyExists =
      wishlist.items.some(
        (item) =>
          item.productId === String(id)
      );


    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist.",
      });
    }


    wishlist.items.push({
      productId: String(id),
      name,
      price,
      image,
      category: category || "",
    });


    await wishlist.save();


    res.status(201).json({
      success: true,
      message: "Added to wishlist ❤️",
      wishlist: wishlist.items,
    });

  } catch (error) {
    console.error(
      "Add wishlist error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to add product.",
    });
  }
};


// ================= REMOVE =================

export const removeFromWishlist = async (
  req,
  res
) => {
  try {
    const { productId } = req.params;

    const wishlist =
      await Wishlist.findOne({
        user: req.user.id,
      });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found.",
      });
    }


    wishlist.items =
      wishlist.items.filter(
        (item) =>
          item.productId !== String(productId)
      );


    await wishlist.save();


    res.status(200).json({
      success: true,
      message: "Removed from wishlist.",
      wishlist: wishlist.items,
    });

  } catch (error) {
    console.error(
      "Remove wishlist error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to remove product.",
    });
  }
};