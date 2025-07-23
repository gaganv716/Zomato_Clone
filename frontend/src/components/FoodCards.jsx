import React from "react";
import "./FoodCards.css";

const FoodCards = ({ onCardClick }) => {
  const foodCategories = [
    {
      title: "Order Online",
      description: "Stay home and order to your doorstep",
      image: "https://b.zmtcdn.com/webFrontend/e5b8785c257af2a7f354f1addaf37e4e1647364814.jpeg?output-format=webp&fit=around|402:360&crop=402:360;*,*",
    },
    {
      title: "Dining",
      description: "View the city's favorite dining venues",
      image: "https://b.zmtcdn.com/webFrontend/d026b357feb0d63c997549f6398da8cc1647364915.jpeg?output-format=webp&fit=around|402:360&crop=402:360;*,*",
    },
    {
      title: "Live Events",
      description: "Discover India’s best events & concerts",
      image: "https://b.zmtcdn.com/data/o2_assets/371de657644f1b5818fcb5d83387c8c91722851940.png?output-format=webp&fit=around|402:360&crop=402:360;*,*",
    },
  ];

  return (
    <div className="food-cards-container">
      {foodCategories.map((food, index) => (
        <div
          key={index}
          className="food-card"
          onClick={onCardClick} // 👈 Trigger modal
          style={{ cursor: "pointer" }}
        >
          <img src={food.image} alt={food.title} />
          <div className="food-card-content">
            <h3>{food.title}</h3>
            <p>{food.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodCards;
