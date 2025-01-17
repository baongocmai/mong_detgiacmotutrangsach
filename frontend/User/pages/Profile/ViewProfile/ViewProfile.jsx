import React, { useState } from "react";
import { FaEdit, FaRegFolderOpen, FaUserAstronaut, FaSyncAlt } from "react-icons/fa"; // Import icon
import { IoIosLogOut } from "react-icons/io";
import { BiReset } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./ViewProfile.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../components/NewBooks.css";
import { Link } from "react-router-dom";

import book1 from "../../../image/book/book1.jpg";
import book2 from "../../../image/book/book2.jpeg";
import book3 from "../../../image/book/book3.jpg";
import book4 from "../../../image/book/book4.jpg";
import book5 from "../../../image/book/book5.jpg";
import book6 from "../../../image/book/book6.jpg";
import book7 from "../../../image/book/book7.jpg";
import book8 from "../../../image/book/book8.jpg";


const ViewProfile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const userInfo = {
    name: "Bảo Ngọc Mai",
    email: "123@gmail.com",
    stories: 10,
    favorites: 5,
    violations: 0,
  };
  const favouriteBook = [
    { title: "Đảo mộng mơ", author: "Nguyễn Nhật Ánh", category: "Văn học Việt Nam", chapters: 10, rating: 5.0, turn: 10, img: book1, status: ["Full", "Hot"] },
    { title: "Mắt biếc", author: "Nguyễn Nhật Ánh", category: "Văn học Việt Nam", chapters: 12, rating: 5.0, turn: 11, img: book2, status: ["Full", "Hot"] },
    { title: "Cho tôi xin một vé đi tuổi thơ", author: "Nguyễn Nhật Ánh", category: "Văn học Việt Nam", chapters: 8, rating: 5.0, turn: 12, img: book3, status: ["Full"] },
    { title: "Tôi thấy hoa vàng trên cỏ xanh", author: "Nguyễn Nhật Ánh", category: "Văn học Việt Nam", chapters: 20, rating: 5.0, turn: 13, img: book4, status: ["Full", "New"] },
    { title: "Đảo nhân phẩm", author: "Lê Thị Thu Nhị", category: "Văn học Việt Nam", chapters: 1, rating: 5.0, turn: 20, img: book5, status: ["Full", "New", "HOT"] },
    { title: "Đảo nhân phẩm tuổi thơ", author: "Lê Thị Thu Nhị", category: "Văn học Việt Nam", chapters: 155, rating: 5.0, turn: 20, img: book6, status: ["Full"] },
    { title: "Đảo hoa vàng trên cỏ xanh", author: "Nguyễn Thị Thu Huệ", category: "Văn học Việt Nam", chapters: 0, rating: 5.0, turn: 30, img: book7, status: ["New", "HOT"] },
    { title: "Đảo biếc", author: "Lê Thu", category: "Văn học Việt Nam", chapters: 155, rating: 5.0, turn: 20, img: book8, status: ["Full"] },
];

  // Toggle mở rộng menu
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Chuyển hướng đến một trang khác
  const goToOtherPage = () => {
    navigate("/otherPage"); // Thay "/otherPage" bằng đường dẫn thực tế của bạn
  };

  // Đăng xuất người dùng
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };
  
  const CustomPrevArrow = ({ onClick }) => {
    return (
      <button
        className="slick-prev"
        onClick={onClick}
        style={{
          display: "flex",
          position: "absolute",
          top: "50%",
          left: "-20px", // Đẩy nút sang trái ngoài slider
          transform: "translateY(-50%)",
          backgroundColor: "rgba(107, 105, 105, 0.5)", // Màu nền mặc định
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          fontSize: "20px",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 1000,
          transition: "background-color 0.3s ease", // Thêm hiệu ứng hover
        }}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor = "#E53E5D") // Đổi màu khi hover
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = "rgba(107, 105, 105, 0.5)") // Trở về màu mặc định
        }
      >
      </button>
    );
  };
  
  const CustomNextArrow = ({ onClick }) => {
    return (
      <button
        className="slick-next"
        onClick={onClick}
        style={{
          display: "flex",
          position: "absolute",
          top: "50%",
          right: "-20px", // Đẩy nút sang phải ngoài slider
          transform: "translateY(-50%)",
          backgroundColor: "rgba(107, 105, 105, 0.5)", // Màu nền mặc định
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          fontSize: "20px",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 1000,
          transition: "background-color 0.3s ease", // Thêm hiệu ứng hover
        }}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor = "#E53E5D") // Đổi màu khi hover
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = "rgba(107, 105, 105, 0.5)") // Trở về màu mặc định
        }
      >
      </button>
    );
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7, // Kích thước mặc định cho màn hình lớn
    slidesToScroll: 1,
    arrows: true, // Bật nút điều hướng
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5, // Điều chỉnh cho màn hình trung bình (tablet)
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4, // Điều chỉnh cho màn hình nhỏ hơn (mobile)
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2, // Giới hạn một slide trên màn hình rất nhỏ
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  // Render giao diện
  return (
    <div className="view-profile">
      <div className={`profile-container ${isDropdownOpen ? "dropdown-open" : ""}`}>
        {/* Menu bên trái */}
        <div className={`profile-left ${isDropdownOpen ? "expanded" : ""}`}>
          <button className="dropdown-toggle-btn" onClick={toggleDropdown}>
            ☰
          </button>
          <div className={`dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
            <button className="dropdown-item" onClick={() => navigate("/myStories")}>
              <FaRegFolderOpen /> Quản lý truyện
            </button>
            <button className="dropdown-item" onClick={() => navigate("/postStory")}>
              <FaEdit /> Đăng truyện
            </button>
            <button className="dropdown-item" onClick={() => navigate("/reset")}>
              <BiReset /> Đổi mật khẩu
            </button>
            <button className="dropdown-item" onClick={handleLogout}>
              <IoIosLogOut /> Đăng xuất
            </button>
            {/* Nút chuyển hướng với icon */}
            <button className="dropdown-item" onClick={goToOtherPage}>
              <FaSyncAlt /> Chuyển trang
            </button>
          </div>
        </div>

        {/* Thông tin người dùng */}
        <div className="profile-center">
          <FaUserAstronaut className="profile-avatar" />
          <h2 className="profile-name">{userInfo.name}</h2>
        </div>

        {/* Chi tiết người dùng */}
        <div className="profile-right">
          <h3>Thông tin người dùng</h3>
          <ul>
            <li>Email: {userInfo.email}</li>
            <li>Số truyện đã đăng: {userInfo.stories}</li>
            <li>Số truyện yêu thích: {userInfo.favorites}</li>
            <li>Số lần vi phạm: {userInfo.violations}</li>
          </ul>
        </div>
      </div>
      <div className="featured-wrapper">
                <button className="bun tagbooks">
                <h2 className="section-title">KHO YÊU THÍCH </h2>
                </button>
                <div className="featured-section">
                    {favouriteBook && favouriteBook.length > 0 ? (
                        <Slider {...settings}>
                            {favouriteBook.map((book, index) => (
                                <div className="book-card" key={index}>
                                    <img src={book.img} alt={book.title} className="book-image" />
                                    <Link to={`/gioi-thieu/${book.id}`} className="book-links"><h3 className="book-title">{book.title}</h3></Link>
                                   
                                    <div className="tags">
                                        {book.status.map((status, i) => (
                                            <span key={i} className={`tag ${status.toLowerCase()}`}>
                                                {status}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="rating">
                                        ⭐ {book.rating.toFixed(1)}
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <p className="no-books">Không còn truyện nào trong danh sách.</p>
                    )}
                </div>
          
<div className="featured-wrapper">
                <button className="bun tagbooks">
                <Link to={`/myStories`} className="book-links"><h2 className="section-title">KHO CỦA BẠN</h2></Link>
                    
                </button>
                <div className="featured-section">
                    {favouriteBook && favouriteBook.length > 0 ? (
                        <Slider {...settings}>
                            {favouriteBook.map((book, index) => (
                                <div className="book-card" key={index}>
                                    <img src={book.img} alt={book.title} className="book-image" />
                                    <Link to={`/gioi-thieu/${book.id}`} className="book-links"><h3 className="book-title">{book.title}</h3></Link>
                                    <div className="tags">
                                        {book.status.map((status, i) => (
                                            <span key={i} className={`tag ${status.toLowerCase()}`}>
                                                {status}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="rating">
                                        ⭐ {book.rating.toFixed(1)}
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <p className="no-books">Không còn truyện nào trong danh sách.</p>
                    )}
                </div>
            </div> 
        </div>
    </div>
  );
};

export default ViewProfile;
