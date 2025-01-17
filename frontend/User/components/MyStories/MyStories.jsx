import React, { useState } from "react";
import "./MyStories.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import book1 from "../../image/book/book1.jpg";
import book2 from "../../image/book/book2.jpeg";
import book3 from "../../image/book/book3.jpg";

function MyStories() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Đảo Mộng Mơ",
      author: "Nguyễn Nhật Ánh",
      category: "Văn học Việt Nam",
      genre: "Tiểu thuyết",
      chapters: 10,
      status: "Hoàn thành",
      rating: 5.0,
      image: book1,
    },
    {
      id: 2,
      title: "Mắt Biếc",
      author: "Nguyễn Nhật Ánh",
      category: "Văn học Việt Nam",
      genre: "Lãng mạn",
      chapters: 12,
      status: "Hoàn thành",
      rating: 4.9,
      image: book2,
    },
    {
      id: 3,
      title: "Xứ sở miên man",
      author: "Phạm Duy Thuận",
      category: "Văn học Việt Nam",
      genre: "Cổ tích",
      chapters: 20,
      status: "Hoàn thành",
      rating: 5.0,
      image: book3,
    },
    // Thêm nhiều sách nếu cần để kiểm tra
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const itemsPerPage = 8; // Hiển thị 8 quyển sách mỗi trang
  const totalPages = Math.ceil(books.length / itemsPerPage);

  const navigate = useNavigate();

  const handleDeleteClick = (book) => {
    setSelectedBook(book);
    setDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    setBooks((prevBooks) => prevBooks.filter((b) => b.id !== selectedBook.id));
    setDeletePopup(false);
    setSelectedBook(null);
  };

  const handleCancelDelete = () => {
    setDeletePopup(false);
    setSelectedBook(null);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentBooks = books.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="search-results">
      <button className="bun tagbooks">
        <h2 className="section-title">KHO CỦA BẠN</h2>
      </button>

      <div className="book-list">
        {currentBooks.map((book) => (
          <div className="book-card" key={book.id}>
            <img src={book.image} alt={book.title} />
            <div className="book-info">
              <div className="book-title-container">
                <Link to={`/gioi-thieu/${book.id}`} className="book-links">
                  <h3 className="book-title">{book.title}</h3>
                </Link>
              </div>
              <p>
                <strong>Tác giả:</strong> {book.author}
              </p>
              <p>
                <strong>Danh mục:</strong> {book.category}
              </p>
              <p>
                <strong>Tổng số chương:</strong> {book.chapters} chương
              </p>
              <p>
                <strong>Tình trạng:</strong> {book.status}
              </p>
              <p>
                <strong>Đánh giá:</strong> {book.rating}/5.0
              </p>
              <div className="action-buttons">
                <FaEdit
                  className="icon edit-icon"
                  title="Chỉnh sửa"
                  onClick={() => navigate(`/editStories/${book.id}`)}
                />
                <FaTrash
                  className="icon delete-icon"
                  title="Xóa"
                  onClick={() => handleDeleteClick(book)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {deletePopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Xóa truyện</h3>
            <p>Bạn có chắc muốn xóa truyện "{selectedBook?.title}" không?</p>
            <div className="popup-actions">
              <button className="btn confirm" onClick={handleConfirmDelete}>
                Xóa
              </button>
              <button className="btn cancel" onClick={handleCancelDelete}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {books.length === 0 && (
        <p className="no-books">Không còn truyện nào trong danh sách.</p>
      )}

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
    </div>
  );
}

export default MyStories;
