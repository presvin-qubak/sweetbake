import React from "react";
import { NavLink } from "react-router-dom";
import "./CategoryCard.css";

const CategoryCard = ({
  name,
  image,
  path,
  icon,
}) => {
  return (
    <NavLink to={path} className="category-card">

      {/* Image */}
      <div className="category-image-wrapper">

        <img
          src={image}
          alt={name}
          className="category-image"
        />

        <div className="category-overlay"></div>

      </div>

      {/* Content */}
      <div className="category-content">

        {icon && (
          <div className="category-icon">
            {icon}
          </div>
        )}

        <h3>{name}</h3>

        <span className="category-link">
          Explore →
        </span>

      </div>

    </NavLink>
  );
};

export default CategoryCard;