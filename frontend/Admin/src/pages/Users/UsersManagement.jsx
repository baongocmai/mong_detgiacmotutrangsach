import React, { useState } from "react";
import Pagination from "../../components/Pagination/Pagination.jsx";
import "./UsersManagement.css";
import { IoPeopleSharp, IoWarning } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const UsersManagement = () => {
  const [users, setUsers] = useState([
    { id: 2341, name: "hoàng tử bé", email: "", status: "Active", createdAt: "2023-12-10" },
    { id: 1442, name: "tôi thấy hoa", email: "", status: "Disabled", createdAt: "2023-12-01" },
    { id: 149, name: "bánh kem và đèn", email: "", status: "Disabled", createdAt: "2023-12-01" },
    { id: 2425, name: "có một lời hứa", email: "", status: "Active", createdAt: "2023-12-01" },
    { id: 4124, name: "giá như", email: "", status: "Active", createdAt: "2023-12-01" },
    { id: 1420, name: "ai mà biết được", email: "", status: "Disabled", createdAt: "2023-12-01" },
    { id: 2325, name: "sống tối giản", email: "", status: "Active", createdAt: "2023-12-01" },
    { id: 4293, name: "một quý cô", email: "", status: "Disabled", createdAt: "2001-02-14" },
    { id: 5555, name: "cuộc sống mới", email: "", status: "Active", createdAt: "2023-12-01" },
  ]);

  const [filteredUsers, setFilteredUsers] = useState(users);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [createdAtFilter, setCreatedAtFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [userToDelete, setUserToDelete] = useState(null); 

  const recordsPerPage = 10;

  // Apply search and filter together
  const applyFiltersAndSearch = () => {
    let filtered = users;

    // Apply filters
    if (statusFilter) {
      filtered = filtered.filter(user => user.status === statusFilter);
    }
    if (createdAtFilter) {
      filtered = filtered.filter(user => user.createdAt === createdAtFilter);
    }

    // Apply search
    if (search) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);  // Reset to first page after filtering and search
  };

  const totalPages = Math.ceil(filteredUsers.length / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredUsers.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Toggle user status (Active to Disabled and vice versa)
  const toggleStatus = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? { ...user, status: user.status === "Active" ? "Disabled" : "Active" }
        : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers); // Update filtered users as well
  };

  // Open confirmation modal
  const openDeleteModal = (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  // Close confirmation modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  // Handle delete action
  const handleDelete = () => {
    const updatedUsers = users.filter((user) => user.id !== userToDelete);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers); // Update filtered users as well
    closeDeleteModal(); // Close the modal after deleting
  };

  return (
    <div className="books-container">
      {/* Tìm kiếm */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={applyFiltersAndSearch}>Search</button>
      </div>

      {/* Dropdown Filters */}
      <div className="filter-container">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Disabled">Disabled</option>
        </select>

        <select value={createdAtFilter} onChange={(e) => setCreatedAtFilter(e.target.value)}>
          <option value="">Select Created At</option>
          <option value="2023-12-01">2023-12-01</option>
        </select>

        <button onClick={applyFiltersAndSearch}>Apply</button>
      </div>

      {/* Bảng dữ liệu */}
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
          {currentRecords.length > 0 ? (
            currentRecords.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>
                  <button
                    style={{
                      color: user.status === "Active" ? "red" : "green",
                    }}
                    onClick={() => toggleStatus(user.id)}
                  >
                    <IoPeopleSharp />
                  </button>
                  <button>
                    <IoWarning />
                  </button>
                  <button onClick={() => openDeleteModal(user.id)}>
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

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Do you want to delete this user?</h3>
            <button onClick={handleDelete} className="confirm-btn">Yes</button>
            <button onClick={closeDeleteModal} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
