import React from "react";
import "./Success.css"; // Import CSS file for styling

const Success = () => {
  return (
    <section className="success-section">
      <h2>Restaurant Success Stories</h2>
      <div className="stories-container">
        {/* Story 1 */}
        <div className="story">
          <h3>Arshad Khan</h3>
          <p className="story-role">Owner of Khushboo Biryani, Shillong</p>
          <p className="story-text">
            "Bitescape enabled me to restart my operations post-COVID when I had no hope of doing my business again. I'm grateful to the platform for helping me thrive—my online ordering business has done so well, it has even taken over my dining business!"
          </p>
        </div>

        {/* Story 2 */}
        <div className="story">
          <h3>Vijay</h3>
          <p className="story-role">Owner of Birgo, Coimbatore</p>
          <p className="story-text">
            "Thanks to Bitescape's invaluable support, our startup cloud kitchen has been doing wonders in the competitive food industry. Their dedication to promoting local businesses and powerful reporting tools have been instrumental in our success, and we look forward to a long-term partnership."
          </p>
        </div>

        {/* Story 3 */}
        <div className="story">
          <h3>Sandeep K Mohan</h3>
          <p className="story-role">Owner of Mysore Raman Idli, Kerala</p>
          <p className="story-text">
            "Bitescape helped us grow by 60% since registration, and now, we are one of the biggest vegetarian joints in Ernakulam city."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Success;
