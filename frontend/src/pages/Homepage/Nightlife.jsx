import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Collection from "../../components/Collection";
import Restaurantlist from "../Restaurant/Restaurantlist";
import Explore from "../../components/Explore";
import Footer from "../../components/Footer";
import LogoutPopup from "../LogoutPopup";
import "../../pages/Restaurant/Restaurantlist.css";
import "./Dining.css"; // Reusing styles

const categories = [
  { name: "Dining Out", icon: "🍽️", path: "/dining" },
  { name: "Delivery", icon: "🛵", path: "/homepage" },
  { name: "Nightlife", icon: "🍺", path: "/nightlife" },
];

// ✅ Nightlife-only restaurant list
const nightlifeRestaurants = [
  {
    id: "stories-bar-kitchen",
    name: "Stories Bar and Kitchen",
    image: "https://b.zmtcdn.com/data/pictures/2/20309202/acc0c97a1c6a24138b0d8e0dd7fddb2e_featured_v2.jpg?output-format=webp",
    description: "A rooftop spot for stories, sips, and bites.",
    rating: "4.4",
    deliveryTime: "35 min",
  },
  {
    id: "soda-factory",
    name: "The Soda Factory",
    image: "https://b.zmtcdn.com/data/pictures/5/20563245/abed34af03ee4de5239f191de23d8172_featured_v2.jpg?output-format=webp",
    description: "Colorful cocktails and great vibes!",
    rating: "4.3",
    deliveryTime: "30 min",
  },
  {
    id: "badmaash",
    name: "Badmaash",
    image: "https://b.zmtcdn.com/data/pictures/7/20797927/dc9eefac1af42c0cb8f010e44f13133a_featured_v2.jpg?output-format=webp",
    description: "A bold place for bolder flavors!",
    rating: "4.5",
    deliveryTime: "28 min",
  },
  {
    id: "byg-brewski",
    name: "Byg Brewski Brewing Company",
    image: "https://b.zmtcdn.com/data/pictures/9/20499219/cd9091a2e1a1d5b26f56d3afd06444e2_featured_v2.jpg?output-format=webp",
    description: "Legendary brews. Iconic bites. Epic vibe.",
    rating: "4.6",
    deliveryTime: "40 min",
  },
  {
    id: "big-barrel",
    name: "Big Barrel Brew Pub",
    image: "https://b.zmtcdn.com/data/pictures/6/19353796/3f11b0ea37c83f1406f09d1d35570dfe_featured_v2.jpg?output-format=webp",
    description: "Brewed with passion. Served with flair.",
    rating: "4.2",
    deliveryTime: "38 min",
  },
  {
    id: "gulp-kitchen",
    name: "Gulp Cocktails and Kitchen",
    image: "https://b.zmtcdn.com/data/pictures/0/20728380/feeff4f5d4f5312fa694d02bfc9d1463_featured_v2.jpg?output-format=webp",
    description: "For the love of good food & wild cocktails.",
    rating: "4.3",
    deliveryTime: "26 min",
  },
  {
    id: "altitude-kitchen",
    name: "Altitude Kitchen and Bar",
    image: "https://b.zmtcdn.com/data/pictures/1/19925361/e2c62d440e00f6314151990f0e97ea4a_featured_v2.jpg?output-format=webp",
    description: "Sky-high dining with a stunning view.",
    rating: "4.1",
    deliveryTime: "33 min",
  },
  {
    id: "district6",
    name: "District 6 Pub Brewery",
    image: "https://b.zmtcdn.com/data/pictures/5/19619585/a1edd7000f25277de1663ed1bd33dd2f_featured_v2.jpg?output-format=webp",
    description: "Fresh brews, global plates, cool crowd.",
    rating: "4.4",
    deliveryTime: "36 min",
  },
  {
    id: "cafe-g",
    name: "Cafe-G Holiday Inn",
    image: "https://b.zmtcdn.com/data/pictures/5/19307415/c53651a8f6478c669d72fee183b5532a_featured_v2.jpg?output-format=webp",
    description: "Meals at Holiday Inn’s signature café.",
    rating: "4.0",
    deliveryTime: "29 min",
  },
  {
    id: "nandhana-palace",
    name: "Nandhana Palace",
    image: "https://b.zmtcdn.com/data/pictures/2/18278222/41992beea23c1bba5ae042af85ed0a5d.jpg",
    description: "Andhra cuisine with a spicy twist.",
    rating: "4.5",
    deliveryTime: "30 min",
  },
  {
    id: "chilis-bar",
    name: "Chili's American Grill & Bar",
    image: "https://b.zmtcdn.com/data/pictures/6/53966/b73b99dd0d16ca338f3287f5a9750adf_featured_v2.jpg",
    description: "Tex-Mex classics & cocktails in a fun vibe.",
    rating: "4.3",
    deliveryTime: "32 min",
  },
  {
    id: "geometry-brewery",
    name: "Geometry Brewery & Kitchen",
    image: "https://b.zmtcdn.com/data/pictures/1/19288221/d28cae90f91fb9927e35f3ff033176cd_featured_v2.jpg",
    description: "Craft beer meets cool geometry vibes.",
    rating: "4.4",
    deliveryTime: "31 min",
  },
  {
    id: "gillys-restobar",
    name: "Gilly's Restobar",
    image: "https://b.zmtcdn.com/data/pictures/2/18224672/2bb6e648b6bec4278d7279c19b3a0316_featured_v2.jpg",
    description: "Buzzing ambiance & music nights.",
    rating: "4.2",
    deliveryTime: "27 min",
  },
  {
    id: "liquids-bar",
    name: "Liquids Bar & Kitchen",
    image: "https://b.zmtcdn.com/data/pictures/7/21677587/b51cfaf3f9b7ca7c294c916e48a4afc9_featured_v2.jpg",
    description: "Signature cocktails and late-night eats.",
    rating: "4.1",
    deliveryTime: "28 min",
  },
  {
    id: "daysie-bar",
    name: "Daysie - All day casual bar",
    image: "https://b.zmtcdn.com/data/pictures/2/21285472/5d52f0f6d7352118cc1f290d01763976_featured_v2.jpg",
    description: "Chill bar with vibrant day & night scenes.",
    rating: "4.3",
    deliveryTime: "33 min",
  },
  {
    id: "cocobolo",
    name: "Cocobolo",
    image: "https://b.zmtcdn.com/data/pictures/4/20777724/bd221dbd8730bf932166498a07a8a958_featured_v2.jpg",
    description: "Boho rooftop, great music, cool cocktails.",
    rating: "4.5",
    deliveryTime: "34 min",
  },
  {
    id: "skyro",
    name: "Skyro",
    image: "https://b.zmtcdn.com/data/pictures/2/21651762/886373a19e909f533dfb951ef0801191_featured_v2.jpg",
    description: "Stargaze while sipping your favorite drink.",
    rating: "4.2",
    deliveryTime: "36 min",
  },
  {
    id: "rox",
    name: "Rox",
    image: "https://b.zmtcdn.com/data/pictures/6/21520226/8bbc6e759c4fb0504bdfe224203af055_featured_v2.jpg",
    description: "Rooftop luxe bar with electrifying mood.",
    rating: "4.3",
    deliveryTime: "38 min",
  }
];


function Nightlife({ isAuthenticated, onLogout }) {
  const [selectedCategory, setSelectedCategory] = useState("Nightlife");
  const underlineRef = useRef(null);
  const categoryRefs = useRef([]);
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const updateUnderline = (index) => {
    const category = categoryRefs.current[index];
    if (underlineRef.current && category) {
      underlineRef.current.style.width = `${category.offsetWidth}px`;
      underlineRef.current.style.transform = `translateX(${category.offsetLeft}px)`;
    }
  };

  useEffect(() => {
    const index = categories.findIndex((c) => c.name === selectedCategory);
    updateUnderline(index);
  }, [selectedCategory]);

  const handleCategoryClick = (category, index) => {
    setSelectedCategory(category.name);
    updateUnderline(index);
    navigate(category.path);
  };

  const handleLogout = () => setShowLogoutPopup(true);
  const handleConfirmLogout = () => {
    setShowLogoutPopup(false);
    onLogout();
  };
  const handleCancelLogout = () => setShowLogoutPopup(false);

  return (
    <div className="dining-page">
      <Navbar
        isAuthenticated={isAuthenticated}
        isHomepage={true}
        onLogout={handleLogout}
      />

      {/* Categories Section */}
      <div className="categories-container">
        <div className="categories-wrapper">
          {categories.map((category, index) => (
            <div
              key={category.name}
              ref={(el) => (categoryRefs.current[index] = el)}
              className={`category-item ${selectedCategory === category.name ? "active" : ""}`}
              onClick={() => handleCategoryClick(category, index)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </div>
          ))}
          <div className="underline" ref={underlineRef}></div>
        </div>
      </div>

      {/* Collection Section */}
      <section className="collection-section">
        <Collection />
      </section>

      {/* Restaurant List Section */}
      <section className="restaurant-list-section">
        <h2 className="section-title">Restaurants for Nightlife</h2>
        <Restaurantlist restaurants={nightlifeRestaurants} />
      </section>

      {/* Explore Section */}
      <section className="explore-section">
        <Explore />
      </section>

      <Footer />

      {showLogoutPopup && (
        <LogoutPopup onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />
      )}
    </div>
  );
}

export default Nightlife;
