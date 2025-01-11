import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import anh from "./ảnh.jpg"; // Đường dẫn ảnh

const Homepage = () => {
  const [isFading, setIsFading] = useState(false); // Điều khiển hiệu ứng mờ dần
  const navigate = useNavigate();

  useEffect(() => {
    // Kích hoạt hiệu ứng mờ dần sau 2 giây
    const fadeTimeout = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    // Chuyển hướng sau 4 giây
    const redirectTimeout = setTimeout(() => {
      navigate("/LoginForm");
    }, 4000);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <div className={`homepage ${isFading ? "fade-out" : ""}`}>
      <img src={anh} alt="Welcome" className="homepage-image" />
    </div>
  );
};

export default Homepage;
