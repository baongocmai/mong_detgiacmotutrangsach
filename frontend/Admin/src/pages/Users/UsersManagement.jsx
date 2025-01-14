import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UsersManagement.css";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { IoPeopleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { BsFillPersonVcardFill } from "react-icons/bs";

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

  const recordsPerPage = 10;

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/admin/users?skip=${(currentPage - 1) * recordsPerPage}&limit=${recordsPerPage}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data); // Apply initial data to filtered list
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentPage]);

  // Apply search and filter together
  const applyFiltersAndSearch = () => {
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
    try {
      const newStatus = currentStatus === "Active" ? "Disabled" : "Active";
      const response = await fetch(`http://localhost:8000/api/admin/users/${userId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user status");
      }
      const updatedUser = await response.json();
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
    try {
      const response = await fetch(`http://localhost:8000/api/admin/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      setUserDetails(data);
      setShowDetailsModal(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };


  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setUserDetails(null);
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
      const response = await fetch(`http://localhost:8000/api/admin/users/${userToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
      setFilteredUsers((prevFiltered) =>
        prevFiltered.filter((user) => user.id !== userToDelete)
      );
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


  return (
    <div className="container">
      <h1>Users Management</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or id..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={applyFiltersAndSearch}>Search</button>
      </div>

      <div className="filter-container">
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

        <button onClick={applyFiltersAndSearch}>Apply</button>
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
                <td>{user.createdAt}</td>
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
            <h3>User Details</h3>
            <p><strong>ID:</strong> {userDetails.id}</p>
            <p><strong>Name:</strong> {userDetails.name}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Status:</strong> {userDetails.status}</p>
            <p><strong>Created At:</strong> {new Date(userDetails.createdAt).toLocaleString()}</p>
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
