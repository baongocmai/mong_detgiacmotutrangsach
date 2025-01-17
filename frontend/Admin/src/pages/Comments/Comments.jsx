import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { MdDelete } from "react-icons/md";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [search, setSearch] = useState(""); // Tìm kiếm theo tên truyện
  const [timeFilter, setTimeFilter] = useState(""); // Lọc theo thời gian
  const [exactDate, setExactDate] = useState(""); // Lọc theo ngày chính xác
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing modal
  const [commentToDelete, setCommentToDelete] = useState(null); // State to track the comment to delete

  const recordsPerPage = 10;

  const totalPages = Math.ceil(filteredComments.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredComments.slice(indexOfFirstRecord, indexOfLastRecord);

  // Fetch all stories and their comments from the API
  const fetchCommentsForAllStories = async () => {
    try {
      const storiesResponse = await axios.get("http://api:8000/api/stories"); // Fetch all stories
      const stories = storiesResponse.data;

      const allComments = [];
      for (let story of stories) {
        const chaptersResponse = await axios.get(`http://api:8000/api/stories/${story.id}/chapters`);
        const chapters = chaptersResponse.data;

        for (let chapter of chapters) {
          const commentsResponse = await axios.get(`http://api:8000/api/stories/${story.id}/chapters/${chapter.chapter_id}/comments`);
          allComments.push(...commentsResponse.data);
        }
      }

      setComments(allComments);
      setFilteredComments(allComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchCommentsForAllStories();
  }, []); // Fetch when the component mounts

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTimeFilter = (filterOption) => {
    setTimeFilter(filterOption);
    let filtered = comments;
    const currentDate = new Date();

    switch (filterOption) {
      case "today":
        const today = currentDate.toISOString().split("T")[0]; // Định dạng YYYY-MM-DD
        filtered = filtered.filter(comment => comment.createdAt === today);
        break;
      case "thisWeek":
        const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        filtered = filtered.filter((comment) => {
          const commentDate = new Date(comment.createdAt);
          return commentDate >= startOfWeek && commentDate <= endOfWeek;
        });
        break;
      case "thisMonth":
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        filtered = filtered.filter((comment) => {
          const commentDate = new Date(comment.createdAt);
          return commentDate >= startOfMonth;
        });
        break;
      case "thisYear":
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        filtered = filtered.filter((comment) => {
          const commentDate = new Date(comment.createdAt);
          return commentDate >= startOfYear;
        });
        break;
      case "exactDate":
        if (exactDate) {
          filtered = filtered.filter(comment => comment.createdAt === exactDate);
        }
        break;
      default:
        break;
    }

    setFilteredComments(filtered);
    setCurrentPage(1); // Reset to first page when applying filter
  };

  const handleSearch = () => {
    let filtered = comments.filter(comment =>
      comment.storyName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredComments(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleDelete = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
    setFilteredComments(updatedComments);
    setShowDeleteModal(false); // Close the modal after deletion
  };

  const openDeleteModal = (id) => {
    setCommentToDelete(id); // Store the comment ID to delete
    setShowDeleteModal(true); // Show the modal
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false); // Close the modal
  };

  const handleExactDateChange = (e) => {
    setExactDate(e.target.value);
  };

  const handleExactDateFilter = (e) => {
    if (e.key === "Enter") {
      handleTimeFilter("exactDate");
    }
  };

  return (
    <div className="container">
      <h1>Comments Management</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by story name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="filter-container">
        <select value={timeFilter} onChange={(e) => handleTimeFilter(e.target.value)}>
          <option value="">Filter by Date</option>
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="thisMonth">This Month</option>
          <option value="thisYear">This Year</option>
          <option value="exactDate">Exact Date</option>
        </select>

        {timeFilter === "exactDate" && (
          <input
            type="date"
            value={exactDate}
            onChange={handleExactDateChange}
            onKeyDown={handleExactDateFilter}
          />
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Content</th>
            <th>User ID</th>
            <th>Chapter ID</th>
            <th>Story Name</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.id}</td>
                <td>{comment.content}</td>
                <td>{comment.userId}</td>
                <td>{comment.chapterId}</td>
                <td>{comment.storyName}</td>
                <td>{comment.createdAt}</td>
                <td>
                  <button
                    className="icon"
                    onClick={() => openDeleteModal(comment.id)} // Open the modal on delete click
                  >
                    <MdDelete />
                  </button>
                </td>
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
            <h3>Do you want to delete this comment?</h3>
            <button onClick={() => handleDelete(commentToDelete)} className="confirm-btn">
              Yes
            </button>
            <button onClick={closeDeleteModal} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
