import React from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import "./ProductCard.css";

function ProductCard({ product }) {
  if (!product) return null;

  const {
    id,
    name,
    image,
    price,
    oldPrice,
    category,
  } = product;

  return (
    <div className="product-card">

      {/* Product Image */}
      <div className="product-image-wrapper">

        {oldPrice && (
          <span className="product-sale">
            SALE
          </span>
        )}

        <button className="wishlist-btn">
          <FaHeart />
        </button>

        <img
          src={image}
          alt={name}
          className="product-image"
        />

      </div>

      {/* Product Information */}
      <div className="product-info">

        <span className="product-category">
          {category}
        </span>

        <h3 className="product-name">
          {name}
        </h3>

        <div className="product-price">

          <span className="current-price">
            ₹{price}
          </span>

          {oldPrice && (
            <span className="old-price">
              ₹{oldPrice}
            </span>
          )}

        </div>

        <button className="add-cart-btn">
          <FaShoppingCart />
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductCard;