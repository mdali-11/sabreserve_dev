import React from "react";
import { Link } from "react-router-dom";
import "./CategorySelector.css";

const categories = [
  { name: "Real Estate", icon: "🏡", path: "realestate" },
  { name: "Travel & Tourism", icon: "✈️", path: "travel" },
  { name: "Ticket Booking", icon: "🎟️", path: "ticket" },
  { name: "Residential Services", icon: "🏠", path: "residential" },
];

const CategorySelector = () => {
  return (
    <div className="category-section">
      <h2>Explore Categories</h2>
      <div className="category-grid">
        {categories.map((category, index) => (
          <Link to={`/services?category=${category.path}`} key={index} className="category-card">
            <span className="category-icon">{category.icon}</span>
            <p>{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
