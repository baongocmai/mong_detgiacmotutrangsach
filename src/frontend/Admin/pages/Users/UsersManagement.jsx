import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UsersManagement.css";
import { IoPeopleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { BsFillPersonVcardFill } from "react-icons/bs";
import Slider from "react-slick";

const UsersManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [createdAtFilter, setCreatedAtFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [stories, setStories] = useState([]); // State for user stories

  const recordsPerPage = 10;

  // Fetch users from backend using Axios
  useEffect(() => {

    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get(
          `http://3.26.145.187:8000/api/admin/users`,
          {
            params: {
              skip: (currentPage - 1) * recordsPerPage,
              limit: recordsPerPage,
            },
          }
        );
        setUsers(response.data);
        setFilteredUsers(response.data); // Apply initial data to filtered list
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentPage]);

  // Apply search, status, and sort filter when clicking search button
  const handleSearch = () => {
    let filtered = users;

    if (statusFilter) {
      filtered = filtered.filter((user) => user.status === statusFilter);
    }

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

    if (search) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.id.toString().includes(search)
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredUsers.length / recordsPerPage);

  const toggleStatus = async (userId, currentStatus) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const newStatus = currentStatus === "Active" ? "Disabled" : "Active";
      const response = await axios.patch(
        `http://3.26.145.187:8000/api/admin/users/${userId}/status`,
        { status: newStatus }
      );
      const updatedUser = response.data;
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setFilteredUsers((prevFiltered) =>
        prevFiltered.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const openDetailsModal = async (userId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const response = await axios.get(`http://3.26.145.187:8000/api/admin/users/${userId}`);
      setUserDetails(response.data);

      const storiesResponse = await axios.get(`http://3.26.145.187:8000/api/users/${userId}/stories`, {
        params: { skip: 0, limit: 10 },
      });
      setStories(storiesResponse.data.items);

      setShowDetailsModal(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setUserDetails(null);
    setStories([]);

  };

  const openDeleteModal = (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://3.26.145.187:8000/api/admin/users/${userToDelete}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
      setFilteredUsers((prevFiltered) =>
        prevFiltered.filter((user) => user.id !== userToDelete)
      );
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="slick-prev"
      onClick={onClick}
      style={{
        display: "flex",
        position: "absolute",
        top: "50%",
        left: "-20px",
        transform: "translateY(-50%)",
        backgroundColor: "rgba(107, 105, 105, 0.5)",
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
        transition: "background-color 0.3s ease",
      }}
    />
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      className="slick-next"
      onClick={onClick}
      style={{
        display: "flex",
        position: "absolute",
        top: "50%",
        right: "-20px",
        transform: "translateY(-50%)",
        backgroundColor: "rgba(107, 105, 105, 0.5)",
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
        transition: "background-color 0.3s ease",
      }}
    />
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container">
      <h1>Users Management</h1>
      <div className="searchb">
        <input
          type="text"
          placeholder="Search by name or id..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="filter-containe">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Disabled">Disabled</option>
        </select>

        <select
          value={createdAtFilter}
          onChange={(e) => setCreatedAtFilter(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>
                  <button
                    className="icon"
                    style={{
                      color: user.status === "Active" ? "red" : "green",
                    }}
                    onClick={() => toggleStatus(user.id, user.status)}
                  >
                    <IoPeopleSharp />
                  </button>
                  <button
                    className="icon"
                    onClick={() => openDetailsModal(user.id)}
                  >
                    <BsFillPersonVcardFill />
                  </button>

                  <button
                    className="icon"
                    onClick={() => openDeleteModal(user.id)}
                  >
                    <MdDelete />
                  </button>
                </td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No results found</td>
            </tr>
          )}
        </tbody>
      </table>

      {showDetailsModal && userDetails && (
        <div className="modal-overlay">
          <div className="modal">
            <p><strong>ID:</strong> {userDetails.id}</p>
            <p><strong>Name:</strong> {userDetails.name}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Status:</strong> {userDetails.status}</p>
            <p><strong>Created At:</strong> {new Date(userDetails.createdAt).toLocaleString()}</p>
            <Slider {...settings}>
              {stories.length > 0 ? (
                stories.map((story) => (
                  <div key={story.id} className="story-card">
                    <img
                      src={story.image || "/placeholder.jpg"}
                      alt={story.title}
                      className="story-image"
                    />
                    <h5>{story.title}</h5>
                    <p>{story.genre}</p>
                    <p>{story.status}</p>
                  </div>
                ))
              ) : (
                <div>No stories available.</div>
              )}
            </Slider>

            <button onClick={closeDetailsModal} className="cancel-btn">
              Close
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Do you want to delete this user?</h3>
            <button onClick={handleDelete} className="confirm-btn">
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

export default UsersManagement;
