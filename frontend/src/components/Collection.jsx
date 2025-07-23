import React from "react";
import "./Collection.css";

const collections = [
  {
    title: "Top Trending Spots",
    places: 41,
    image: "https://b.zmtcdn.com/data/collections/684397cd092de6a98862220e8cc40aca_1709810207.png",
  },
  {
    title: "Best Rooftop Places",
    places: 50,
    image: "https://b.zmtcdn.com/data/collections/2b9361aa328a43b08986f77bbec280bd_1709810493.png",
  },
  {
    title: "Newly Opened Places",
    places: 30,
    image: "https://b.zmtcdn.com/data/collections/6922d49fb675d0490edb652abf5ca45f_1727171292.png",
  },
  {
    title: "Iftar Specials",
    places: 16,
    image: "https://b.zmtcdn.com/data/collections/cb00ad801329fe0768a237ba4ef81383_1710849427.png?fit=around|562.5:360&crop=562.5:360;*,*",
  },
];

const Collection = () => {
  return (
    <div className="collection-container">
      <h2 className="collection-title">Collections</h2>
      <p className="collection-description">
        Explore curated lists of top restaurants, cafes, pubs, and bars in Bengaluru, based on trends.
      </p>
      <div className="collection-grid">
        {collections.map((item, index) => (
          <div key={index} className="collection-card">
            <img src={item.image} alt={item.title} className="collection-image" />
            <div className="collection-info">
              <h3>{item.title}</h3>
              <p>{item.places} Places</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
