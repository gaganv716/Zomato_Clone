// RestaurantList.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Restaurantlist.css"; // Add specific styles for the restaurant list if needed

const Restaurantlist = ({ restaurants }) => {
  const navigate = useNavigate();
  const defaultRestaurants = [
    {
      id: "nandhana-palace",
      name: "Nandhana Palace",
      image: "https://b.zmtcdn.com/data/pictures/2/18278222/41992beea23c1bba5ae042af85ed0a5d.jpg",
      description: "Andhra cuisine with a spicy twist.",
      rating: "4.5",
      deliveryTime: "30 min",
    },
    {
      id: "pizza-hut",
      name: "Pizza Hut",
      image: "https://b.zmtcdn.com/data/pictures/chains/8/51418/8825db90e0b3e0013bffefdd596eaf58.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*",
      description: "Delicious pizzas with global flavors.",
      rating: "4.2",
      deliveryTime: "25 min",
    },
    {
      id: "beijing-bites",
      name: "Beijing Bites",
      image: "https://b.zmtcdn.com/data/pictures/4/20211514/2c51e7f19385a59c3394e2fa6d3c8fff.jpg?fit=around|300:273&crop=300:273;*,*",
      description: "Chinese delicacies for a flavorful journey.",
      rating: "4.3",
      deliveryTime: "35 min",
    },
    {
      id: "kamadhenu-veg",
      name: "Kamadhenu Veg",
      image: "https://b.zmtcdn.com/data/dish_photos/4b4/6cc0001e761092039eaa223963f224b4.png",
      description: "Craving for South Indian? This is it.",
      rating: "4.2",
      deliveryTime: "17 min",
    },
      {
        id: "sagar-gardenia",
        name: "Sagar Gardenia",
        image: "https://b.zmtcdn.com/data/dish_photos/a4b/60b9c350e44179ab70aa93f710094a4b.jpg",
        description: "Flavour-packed bites, served fresh!",
        rating: "4.2",
        deliveryTime: "16 min",
      },
      {
        id: "kabab-factory",
        name: "Kabab Factory",
        image: "https://b.zmtcdn.com/data/dish_photos/228/511a222291e84bf68852df377aaa8228.jpg",
        description: "Grill. Spice. Perfection.",
        rating: "4.2",
        deliveryTime: "23 min",
      },
      {
        id: "polar-bear",
        name: "Polar Bear",
        image: "https://b.zmtcdn.com/data/pictures/1/18359111/bfe59ef78d237e69af2c128473176552_o2_featured_v2.jpg",
        description: "Ice creams that hit the sweet spot!",
        rating: "4.2",
        deliveryTime: "23 min",
      },
      {
        id: "kfc",
        name: "KFC",
        image: "https://b.zmtcdn.com/data/pictures/chains/4/50574/27a0c6e70b3754d9cfb14d6eccb44bd0_o2_featured_v2.jpg",
        description: "Crispy, juicy, legendary chicken! ",
        rating: "3.6",
        deliveryTime: "20 min",
      },
      {
        id: "burger-king",
        name: "Burger King",
        image: "https://b.zmtcdn.com/data/pictures/4/21328514/cc8f83eb4e1cb9421c88bfb16fb7a82e_o2_featured_v2.jpg",
        description: "Grilled burgers, royalty in every bite!  ",
        rating: "4.0",
        deliveryTime: "38 min",
      },
      {
        id: "thalassery-restaurant",
        name: "Thalassery Restaurant",
        image: "https://b.zmtcdn.com/data/pictures/8/20036118/c1d7cd35fcb4d93259c285b063bd5e9b_o2_featured_v2.jpg",
        description: "Authentic Kerala flavors!  ",
        rating: "4.1",
        deliveryTime: "34 min",
      },
      {
        id: "andhra-gunpowder",
        name: "Andhra Gunpowder",
        image: "https://b.zmtcdn.com/data/pictures/chains/9/19051939/631e94b5e92a24f8dc745a253a4caeeb_o2_featured_v2.jpg",
        description: "Fiery Andhra spice, unforgettable!  ",
        rating: "4.2",
        deliveryTime: "27 min",
      },
      {
        id: "bakasura-bandi",
        name: "Bakasura Bandi",
        image: "https://b.zmtcdn.com/data/pictures/0/19666710/98649ece168b8935db930ae53feb4f7e_o2_featured_v2.jpg",
        description: "Big bites, beastly cravings!   ",
        rating: "3.8",
        deliveryTime: "23 min",
      },
      {
        id: "nammane-upachar",
        name: "Nammane Upachar",
        image: "https://b.zmtcdn.com/data/pictures/0/18353120/b4b0d00087d1958c10adf5f85d44d56a_o2_featured_v2.jpg",
        description: "Homely meals, hearty feels!  ",
        rating: "4.1",
        deliveryTime: "17 min",
      },
      {
        id: "krishna-vaibhav",
        name: "Krishna Vaibhav",
        image: "https://b.zmtcdn.com/data/pictures/5/19422875/14bb38a6e3fc9e743d4996aa0ef02993_o2_featured_v2.jpg",
        description: "Divine taste, South Indian style!   ",
        rating: "4.3",
        deliveryTime: "32 min",
      },
      {
        id: "ayodhya-grand",
        name: "Ayodhya Grand",
        image: "https://b.zmtcdn.com/data/pictures/6/18539726/a6d1ebbde50099e6d535eea9e95e9c06_o2_featured_v2.jpg",
        description: "Royal feast, rooted in tradition! ",
        rating: "4.2",
        deliveryTime: "17 min",
      },
      {
        id: "empire-restaurant",
        name: "Empire Restaurant",
        image: "https://b.zmtcdn.com/data/pictures/5/20754725/16b9c06f0fb61665e59ba473dca8d080_o2_featured_v2.jpg",
        description: "Late-night cravings? Empire's got you!  ",
        rating: "4.2",
        deliveryTime: "41 min",
      },
      {
        id: "onesta",
        name: "Onesta",
        image: "https://b.zmtcdn.com/data/pictures/9/18617849/41c0967f81752b7407d8f345b2a450e2_o2_featured_v2.jpg",
        description: "Unlimited pizzas, unlimited joy!  ",
        rating: "3.7",
        deliveryTime: "40 min",
      },
      {
        id: "chinese-wok",
        name: "Chinese Wok",
        image: "https://b.zmtcdn.com/data/pictures/6/21644336/80ed47ee212a0b51b60fac05021f3a42_o2_featured_v2.jpg",
        description: "Wok-tossed magic in every bite!  ",
        rating: "4.1",
        deliveryTime: "45 min",
      },
  ];

  // Use provided restaurants or fallback to defaultRestaurants
  const restaurantData = restaurants || defaultRestaurants;

  return (
    <div className="restaurants-grid">
      {restaurantData.map((restaurant, index) => (
        <div
          key={index}
          className="restaurant-card"
          onClick={() => navigate(`/order/${restaurant.id}`)}
          style={{ cursor: "pointer" }}
        >
          <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
          <div className="restaurant-info">
            <h3 className="restaurant-name">{restaurant.name}</h3>
            <p className="restaurant-description">{restaurant.description}</p>
            <div className="restaurant-meta">
              <span className="restaurant-rating">⭐ {restaurant.rating}</span>
              <span className="restaurant-time">{restaurant.deliveryTime}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Restaurantlist;
