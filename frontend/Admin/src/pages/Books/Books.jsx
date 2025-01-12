import React, { useState } from "react";
import Pagination from "../../components/Pagination/Pagination.jsx";
import "./Books.css";
import { MdDelete, MdOutlineWarningAmber, MdMenuBook } from "react-icons/md";

const Books = () => {
  const [books, setBooks] = useState([
    { id: 2341, title: "hoàng tử bé", category: "sách thiếu nhi", genre: "hài hước", status: "Full", createdAt: "2022-12-01" },
    { id: 1442, title: "tôi thấy hoa", category: "tiểu thuyết", genre: "hồi ký, tự truyện", status: "Full", createdAt: "2023-12-01" },
    { id: 149, title: "bánh kem và đèn", category: "tiểu thuyết", genre: "hài hước", status: "Ongoing", createdAt: "2023-12-01" },
    { id: 4143, title: "biển cả và em", category: "tiểu thuyết", genre: "ngôn tình", status: "Dropped", createdAt: "2023-12-01" },
    { id: 2425, title: "có một lời hứa", category: "truyện ngắn", genre: "trinh thám", status: "Full", createdAt: "2023-12-01" },
    { id: 4124, title: "giá như", category: "tiểu thuyết", genre: "tâm lý", status: "Dropped", createdAt: "2023-12-01" },
    { id: 1420, title: "ai mà biết được", category: "tâm lý", genre: "tâm lý", status: "Ongoing", createdAt: "2023-12-01" },
    { id: 2325, title: "sống tối giản", category: "Self-Help", genre: "Self-Help", status: "Dropped", createdAt: "2001-12-01" },
    { id: 4293, title: "một quý cô", category: "sức khỏe", genre: "sức khỏe", status: "Full", createdAt: "2023-12-01" },
    { id: 5555, title: "cuộc sống mới", category: "tiểu thuyết", genre: "phiêu lưu", status: "Ongoing", createdAt: "2023-12-01" },
    { id: 6666, title: "hành trình bất tận", category: "tiểu thuyết", genre: "phiêu lưu", status: "Full", createdAt: "2010-12-01" },
  ]);

  const [filteredBooks, setFilteredBooks] = useState(books);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [createdAtFilter, setCreatedAtFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const recordsPerPage = 10;

  // Apply search and filter together
  const applyFiltersAndSearch = () => {
    let filtered = books;

    // Apply filters
    if (statusFilter) {
      filtered = filtered.filter(book => book.status === statusFilter);
    }
    if (categoryFilter) {
      filtered = filtered.filter(book => book.category === categoryFilter);
    }
    // Apply sorting by Created At
    if (createdAtFilter) {
      filtered = [...filtered].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        if (createdAtFilter === "Newest") {
          return dateB - dateA; // Sort descending
        } else if (createdAtFilter === "Oldest") {
          return dateA - dateB; // Sort ascending
        }
        return 0;
      });
    }


    // Apply search
    if (search) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
    setCurrentPage(1);  // Reset to first page after filtering and search
  };

  const totalPages = Math.ceil(filteredBooks.length / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredBooks.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Open confirmation modal
  const openDeleteModal = (bookId) => {
    setBookToDelete(bookId);
    setShowDeleteModal(true);
  };

  // Close confirmation modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setBookToDelete(null);
  };

  // Handle delete action
  const handleDelete = () => {
    const updatedBooks = books.filter((book) => book.id !== bookToDelete);
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks); // Update filtered books as well
    closeDeleteModal(); // Close the modal after deleting
  };

  return (
    <div className="container">
      {/* Tìm kiếm */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={applyFiltersAndSearch}>Search</button>
      </div>

      {/* Dropdown Filters */}
      <div className="filter-container">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Full">Full</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Dropped">Dropped</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="tiểu thuyết">Tiểu thuyết</option>
          <option value="truyện ngắn">Truyện ngắn</option>
          <option value="Self-Help">Self-Help</option>
          <option value="sức khỏe">Sức khỏe</option>
        </select>

        <select
          value={createdAtFilter}
          onChange={(e) => setCreatedAtFilter(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>

        <button onClick={applyFiltersAndSearch}>Apply</button>
      </div>

      {/* Bảng dữ liệu */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Genre</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.category}</td>
                <td>{book.genre}</td>
                <td>{book.status}</td>
                <td>
                  <button className="icon"><MdMenuBook /></button>
                  <button className="icon"><MdOutlineWarningAmber /></button>
                  <button className="icon" onClick={() => openDeleteModal(book.id)}>
                    <MdDelete />
                  </button>
                </td>
                <td>{book.createdAt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No results found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Do you want to delete this book?</h3>
            <button onClick={handleDelete} className="confirm-btn">Yes</button>
            <button onClick={closeDeleteModal} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
