import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination/Pagination.jsx";
import "./ListOfStories.css";
import { MdDelete, MdOutlineWarningAmber, MdMenuBook } from "react-icons/md";
import axios from "axios";

const ListOfStories = () => {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [createdAtFilter, setCreatedAtFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState(null);

  const recordsPerPage = 10;

  // Fetch stories from the backend
  const fetchStories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/stories", {
        params: {
          skip: (currentPage - 1) * recordsPerPage,
          limit: recordsPerPage,
          keyword: search,
          status: statusFilter,
          category_ids: categoryFilter,
          sort_by: "created_at", 
          sort_order: "desc",
        },
      });
      setStories(response.data.items);
      setFilteredStories(response.data.items);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [currentPage, search, statusFilter, categoryFilter]);

  const totalPages = Math.ceil(filteredStories.length / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredStories.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openDeleteModal = (storyId) => {
    setStoryToDelete(storyId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setStoryToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/stories/${storyToDelete}`);
      setStories(stories.filter((story) => story.id !== storyToDelete));
      setFilteredStories(filteredStories.filter((story) => story.id !== storyToDelete));
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={fetchStories}>Search</button>
      </div>

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

        <button onClick={fetchStories}>Apply Filters</button>
      </div>

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
            currentRecords.map((story) => (
              <tr key={story.id}>
                <td>{story.id}</td>
                <td>{story.title}</td>
                <td>{story.category}</td>
                <td>{story.genre}</td>
                <td>{story.status}</td>
                <td>
                  <button className="icon"><MdMenuBook /></button>
                  <button className="icon"><MdOutlineWarningAmber /></button>
                  <button className="icon" onClick={() => openDeleteModal(story.id)}>
                    <MdDelete />
                  </button>
                </td>
                <td>{story.createdAt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No results found</td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Do you want to delete this story?</h3>
            <button onClick={handleDelete} className="confirm-btn">Yes</button>
            <button onClick={closeDeleteModal} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListOfStories;
