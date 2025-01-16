import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination/Pagination.jsx";
import "./ListOfStories.css";
import { MdDelete, MdReport, MdMenuBook } from "react-icons/md";
import axios from "axios";

const ListOfStories = () => {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedStoryReports, setSelectedStoryReports] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState(null);


  const recordsPerPage = 10;

  const fetchStories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/stories", {
        params: {
          skip: (currentPage - 1) * recordsPerPage,
          limit: recordsPerPage,
          status: statusFilter,
        },
      });
      setStories(response.data.items);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchReports = async (storyId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/reports/stories/${storyId}`);
      setSelectedStoryReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const applyFilters = () => {
    let filtered = stories;

    if (search) {
      filtered = filtered.filter((story) =>
        story.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((story) => story.status === statusFilter);
    }

    if (categoryFilter) {
      filtered = filtered.filter((story) => story.category === categoryFilter);
    }

    setFilteredStories(filtered);
  };

  useEffect(() => {
    fetchStories();
  }, [currentPage, statusFilter]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, statusFilter, categoryFilter, stories]);

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

  const openDetailModal = (story) => {
    setSelectedStory(story);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedStory(null);
  };

  const openReportModal = (story) => {
    setSelectedStory(story);
    fetchReports(story.id);  // Lấy các báo cáo của câu chuyện
    setShowReportModal(true);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setSelectedStoryReports([]);
    setSelectedStory(null);
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
      </div>

      <div className="filter-container">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="ONGOING">ONGOING</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="DROPPED">DROPPED</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={applyFilters}>Search</button>
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
                  <button onClick={() => openDetailModal(story)}>
                    <MdMenuBook />
                  </button>
                  <button onClick={() => openDeleteModal(story.id)}>
                    <MdDelete />
                  </button>
                  <button onClick={() => openReportModal(story)}>
                    <MdReport />
                  </button>
                </td>
                <td>{new Date(story.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No results found</td>
            </tr>
          )}
        </tbody>
      </table>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Do you want to delete this story?</h3>
            <button onClick={handleDelete} className="confirm-btn">Yes</button>
            <button onClick={closeDeleteModal} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}

      {showDetailModal && selectedStory && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Story Details</h3>
            <p><strong>Title:</strong> {selectedStory.title}</p>
            <p><strong>Category:</strong> {selectedStory.category}</p>
            <p><strong>Genre:</strong> {selectedStory.genre}</p>
            <p><strong>Status:</strong> {selectedStory.status}</p>
            <p><strong>Created At:</strong> {new Date(selectedStory.createdAt).toLocaleString()}</p>
            <button onClick={closeDetailModal} className="cancel-btn">Close</button>
          </div>
        </div>
      )}

      {showReportModal && selectedStoryReports.length > 0 && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Reports for Story "{selectedStory.title}"</h3>
            <ul>
              {selectedStoryReports.map((report) => (
                <li key={report.report_id}>
                  <p><strong>Reason:</strong> {report.reason}</p>
                  <p><strong>Status:</strong> {report.status}</p>
                  <p><strong>Admin Note:</strong> {report.admin_note || "None"}</p>
                  <hr />
                </li>
              ))}
            </ul>
            <button onClick={closeReportModal} className="cancel-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListOfStories;
