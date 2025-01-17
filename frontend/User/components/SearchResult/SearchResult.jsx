import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SearchResult.css";
import "../NewBooks.css";
import { Link } from "react-router-dom";
import book1 from "./book/book1.jpg";
import book2 from "./book/book2.jpeg";
import book3 from "./book/book3.jpg";
import book4 from "./book/book4.jpg";
import book5 from "./book/book5.jpg";
import book6 from "./book/book6.jpg";
import book7 from "./book/book7.jpg";
import book8 from "./book/book8.jpg";

function SearchResult() {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8); // Điều chỉnh số lượng sách trên mỗi trang

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  const mockData = [
    { title: "Đảo mộng mơ", author: "Nguyễn Nhật Ánh", category: "Văn học Việt Nam", chapters: 10, rating: 5.0, turn: 10, img: book1, status: ["Full", "Hot"] },
    { title: "Mắt biếc", author: "Nguyễn Nhật Ánh", category: "Văn học Việt Nam", chapters: 12, rating: 5.0, turn: 11, img: book2, status: ["Full", "Hot"] },
    { title: "Cho tôi xin một vé đi tuổi thơ", author: "Nguyễn Nhật Ánh", category: "Văn học Việt Nam", chapters: 8, rating: 5.0, turn: 12, img: book3, status: ["Full"] },
    { title: "Tôi thấy hoa vàng trên cỏ xanh", author: "Nguyễn Nhật Ánh", category: "Văn học Việt Nam", chapters: 20, rating: 5.0, turn: 13, img: book4.replace, status: ["Full", "New"] },
    { title: "Đảo nhân phẩm", author: "Lê Thị Thu Nhị", category: "Văn học Việt Nam", chapters: 1, rating: 5.0, turn: 20, img: book5, status: ["Full", "New"] },
    { title: "Đảo nhân phẩm", author: "Lê Thị Thu Nhị", category: "Văn học Việt Nam", chapters: 155, rating: 5.0, turn: 20, img: book6, status: ["Full"] },
    { title: "Đảo hoa vàng trên cỏ xanh", author: "Nguyễn Thị Thu Huệ", category: "Văn học Việt Nam", chapters: 0, rating: 5.0, turn: 30, img: book7, status: ["New"] },
    { title: "Đảo biếc", author: "Lê Thu", category: "Văn học Việt Nam", chapters: 155, rating: 5.0, turn: 20, img: book8, status: ["Full"] },
  ];

  useEffect(() => {
    if (query) {
      // Lọc sách theo tên sách hoặc tác giả, từ khóa phải khớp với một trong hai
      const filteredBooks = mockData.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
      );
      setBooks(filteredBooks);
      setCurrentPage(1); // Đặt lại về trang đầu tiên
    }
  }, [query]);
  
  // Lấy sách cho trang hiện tại
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Tính số trang
  const totalPages = Math.ceil(books.length / booksPerPage);

  // Chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="search-results">
      <h2>Kết quả tìm kiếm cho: "{query}"</h2>
      <button className="bun tagbooks"><h2 className="section-title">TRUYỆN LIÊN QUAN</h2></button>
      {books.length > 0 ? (
        <div className="book-list">
          {currentBooks.map((book, index) => (
            <div className="book-card">
            <img src={book.img} alt={book.title} />
            <div className="book-info">
              {/* Phần tên sách được tách riêng */}
              <div className="book-title-container">
                <Link to={`/gioi-thieu/${book.id}`} className="book-links">
                  <h3 className="book-title">{book.title}</h3>
                </Link>
              </div>
          
              {/* Các thông tin sách khác */}
              <p><strong>Tác giả:</strong> {book.author}</p>
              <p><strong>Danh mục:</strong> {book.category}</p>
              <p><strong>Tổng số chương:</strong> {book.chapters} chương</p>
              <p><strong>Tình trạng:</strong> {book.status.join(", ")}</p>
              <p><strong>Đánh giá:</strong> {book.rating.toFixed(1)}/5.0 ({book.turn} lượt)</p>
            </div>
          </div>
          
          ))}
        </div>
      ) : (
        <p>Không tìm thấy kết quả nào.</p>
      )}
      {/* Phân trang */}
      {mockData.length > booksPerPage && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              disabled={currentPage === index + 1}
              className={currentPage === index + 1 ? "active-page" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResult;
