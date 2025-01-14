import React from "react";
import "./NewBooks.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import book1 from "../image/book/book5.jpg";
import book2 from "../image/book/book6.jpg";
import book3 from "../image/book/book7.jpg";
import book4 from "../image/book/book8.jpg";

function NewBooks() {
  const books = [
    { title: "Đảo Mộng Mơ", image: book1, tags: ["FULL", "HOT", "NEW"], rating: 5.0 },
    { title: "Cuộc Sống Giống Cuộc Đời", image: book2, tags: ["FULL", "HOT"], rating: 5.0 },
    { title: "Người Mẹ Lặng Thầm", image: book3, tags: ["FULL", "HOT"], rating: 4.9 },
    { title: "Hãy Khiến Tương Lai Của Bạn", image: book4, tags: ["HOT"], rating: 4.9 },
    { title: "Sách Mới 1", image: book1, tags: ["NEW"], rating: 4.8 },
    { title: "Sách Mới 2", image: book2, tags: ["HOT"], rating: 4.7 },
    { title: "Sách Mới 3", image: book3, tags: ["FULL"], rating: 4.6 },
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
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true, // Bật nút điều hướng
    // prevArrow: <button class="slick-prev" style="display: flex;">❮</button>,
    // nextArrow: <button class="slick-next" style="display: flex;">❯</button>,
    
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
  

  return (
    <div className="featured-wrapper">
      <button className="bun tagbooks"><h2 className="section-title">TRUYỆN MỚI</h2></button>
      <div className="featured-section">
        <Slider {...settings}>
          {books.map((book, index) => (
            <div className="book-card" key={index}>
              <img src={book.image} alt={book.title} className="book-image" />
              <a href="#book" className="book-link">
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
  );
}

export default NewBooks;
