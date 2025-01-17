import React from "react";

const Banner = () => {
  const banners = [
    { id: 1, imageUrl: "/banner1.png" },
    { id: 2, imageUrl: "/banner2.png" },
    { id: 3, imageUrl: "/banner3.png" },
    { id: 4, imageUrl: "/banner4.png" },
  ];

  return (
    <div className="admin-banner-manager">
      {/* Danh sách banner */}
      <div className="banner-list">
        {banners.map((banner) => (
          <div key={banner.id} className="banner-item">
            <img
              src={banner.imageUrl}
              alt={`Banner ${banner.id}`}
              className="banner-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
