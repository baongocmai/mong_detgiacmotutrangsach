import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Category.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

function Genre() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const tags = [
    { name: "Truyện ngắn", path: "./truyen-ngan" },
    { name: "Lãng mạn", path: "./lang-man" },
    { name: "Kinh dị", path: "./kinh-di" },
    { name: "Giả tưởng", path: "./gia-tuong" },
    { name: "Hồi ký", path: "./hoi-ky" },
    { name: "Phiêu lưu", path: "./phieu-luu" },
  ];

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
        ❮
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
        ❯
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true, // Bật nút điều hướng
    prevArrow: <CustomPrevArrow />, // Sử dụng nút điều hướng tùy chỉnh
    nextArrow: <CustomNextArrow />, // Sử dụng nút điều hướng tùy chỉnh
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  useEffect(() => {
    // Gọi API từ backend
    axios
      .get("http://localhost:8000/stories") // URL của API backend
      .then((response) => {
        setBooks(response.data); // Lưu dữ liệu vào state
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Hiển thị loading khi dữ liệu đang tải
  }

  if (books.length === 0) {
    return <div>Không có truyện</div>; // Hiển thị thông báo nếu không có truyện
  }

  return (
    <div>
      <div className="tag-container">
        {tags.map((tag, index) => (
          <Link key={index} to={tag.path} className="tag-item">
            {tag.name}
          </Link>
        ))}
      </div>

      <div className="featured-wrapper">
        <button className="bun tagbooks">
          <h2 className="section-title">GỢI Ý CHO BẠN</h2>
        </button>
        <div className="featured-section">
          <Slider {...settings}>
            {books.map((book, index) => (
              <div className="book-card" key={index}>
                <img src={book.image} alt={book.title} className="book-image" />
                <Link to={`/gioi-thieu/${book.id}`} className="book-link">
                                <h3 className="book-title">{book.title}</h3>
                              </Link>
                <div className="tags">
                  {book.tags.map((tag, i) => (
                    <span key={i} className={`tag ${tag.toLowerCase()}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="rating">⭐ {book.rating.toFixed(1)}</div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="featured-wrapper">
        <button className="bun tagbooks">
          <h2 className="section-title">VĂN HỌC VIỆT NAM NỔI BẬT</h2>
        </button>
        <div className="featured-section">
          <Slider {...settings}>
            {books.map((book, index) => (
              <div className="book-card" key={index}>
                <img src={book.image} alt={book.title} className="book-image" />
                <Link to={`/gioi-thieu/${book.id}`} className="book-link">
                                <h3 className="book-title">{book.title}</h3>
                              </Link><a href="#book" className="book-link">
                  <h3 className="book-title">{book.title}</h3>
                </a>
                <div className="tags">
                  {book.tags.map((tag, i) => (
                    <span key={i} className={`tag ${tag.toLowerCase()}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="rating">⭐ {book.rating.toFixed(1)}</div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="featured-wrapper">
        <button className="bun tagbooks">
          <h2 className="section-title">VĂN HỌC VIỆT NAM MỚI</h2>
        </button>
        <div className="featured-section">
          <Slider {...settings}>
            {books.map((book, index) => (
              <div className="book-card" key={index}>
                <img src={book.image} alt={book.title} className="book-image" />
                <Link to={`/gioi-thieu/${book.id}`} className="book-link">
                                <h3 className="book-title">{book.title}</h3>
                              </Link>
                <div className="tags">
                  {book.tags.map((tag, i) => (
                    <span key={i} className={`tag ${tag.toLowerCase()}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="rating">⭐ {book.rating.toFixed(1)}</div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Genre;
