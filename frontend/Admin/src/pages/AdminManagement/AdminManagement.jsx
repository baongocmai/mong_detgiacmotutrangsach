import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { MdDelete } from "react-icons/md";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { GiTeamUpgrade } from "react-icons/gi";

const AdminManagement = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState([
        { id: 2425, name: "có một lời hứa", email: "", createdAt: "2023-12-01" },
        { id: 4124, name: "giá như", email: "", createdAt: "2023-12-01" },
        { id: 1420, name: "ai mà biết được", email: "", createdAt: "2023-12-01" },
        { id: 2325, name: "sống tối giản", email: "", createdAt: "2023-12-01" },
        { id: 4293, name: "một quý cô", email: "", createdAt: "2001-02-14" },
    ]);
    const [users, setUsers] = useState([
        { id: 2425, name: "có một lời hứa", email: "test1@mail.com", createdAt: "2023-12-01", role: "user" },
        { id: 2425, name: "tôi thấy hoa vàng trên cỏ xanh", email: "test1@mail.com", createdAt: "2023-12-01", role: "user" },
        { id: 2425, name: "Jun", email: "test1@mail.com", createdAt: "2023-12-01", role: "user" },
        { id: 2425, name: "ST", email: "test1@mail.com", createdAt: "2023-12-01", role: "user" },
        { id: 2425, name: "Soobin", email: "test1@mail.com", createdAt: "2023-12-01", role: "user" },
        { id: 2425, name: "buicongnam", email: "test1@mail.com", createdAt: "2023-12-01", role: "user" },
        { id: 2425, name: "có một lời hứa", email: "test1@mail.com", createdAt: "2023-12-01", role: "user" },

        // Add other users here
    ]);
    const [filteredAdmin, setFilteredAdmin] = useState(admin);
    const [search, setSearch] = useState("");
    const [createdAtFilter, setCreatedAtFilter] = useState("");
    const [searchModal, setSearchModal] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState(null);

    const [currentPageModal, setCurrentPageModal] = useState(1);
    const recordsPerPage = 10;
    const recordsPerPageModal = 5;

    const applyFiltersAndSearch = () => {
        let filtered = admin;
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
            filtered = filtered.filter(ad =>
                ad.name.toLowerCase().includes(search.toLowerCase()) ||
                ad.id.toString().includes(search)
            );
        }

        setFilteredAdmin(filtered);
        setCurrentPage(1);
    };

    const applyModalSearch = () => {
        let filteredUsers = users;
        if (searchModal) {
            filteredUsers = filteredUsers.filter(user =>
                user.name.toLowerCase().includes(searchModal.toLowerCase()) ||
                user.id.toString().includes(search)
            );
        }
        return filteredUsers;
    };

    const totalPages = Math.ceil(filteredAdmin.length / recordsPerPage);
    const totalPagesModal = Math.ceil(applyModalSearch().length / recordsPerPageModal);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredAdmin.slice(indexOfFirstRecord, indexOfLastRecord);

    const indexOfLastRecordModal = currentPageModal * recordsPerPageModal;
    const indexOfFirstRecordModal = indexOfLastRecordModal - recordsPerPageModal;
    const currentRecordsModal = applyModalSearch().slice(indexOfFirstRecordModal, indexOfLastRecordModal);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageChangeModal = (page) => {
        setCurrentPageModal(page);
    };

    const openDeleteModal = (adminId) => {
        setAdminToDelete(adminId);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setAdminToDelete(null);
    };

    const handleDelete = () => {
        const updatedAdmin = admin.filter((ad) => ad.id !== adminToDelete);
        setAdmin(updatedAdmin);
        setFilteredAdmin(updatedAdmin);
        closeDeleteModal();
    };

    const openAddModal = () => {
        setShowAddModal(true);
    };

    const closeAddModal = () => {
        setShowAddModal(false);
    };

    const grantAdmin = (userId) => {
        const userToPromote = users.find(user => user.id === userId);
        if (userToPromote) {
            const newAdmin = {
                id: userToPromote.id,
                name: userToPromote.name,
                email: userToPromote.email,
                createdAt: new Date().toISOString().split("T")[0],
            };
            setAdmin([...admin, newAdmin]);
            setFilteredAdmin([...filteredAdmin, newAdmin]);
            alert(`${userToPromote.name} has been granted admin rights.`);
        }
        closeAddModal();
    };

    return (
        <div className="container">
            <h1>Admin Management</h1>
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
            <div className="add-form">
                <button onClick={openAddModal}>
                    Add
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((ad) => (
                        <tr key={ad.id}>
                            <td>{ad.id}</td>
                            <td>{ad.name}</td>
                            <td>{ad.email}</td>
                            <td>
                                <button onClick={() => openDeleteModal(ad.id)}>
                                    <MdDelete />
                                </button>
                            </td>
                            <td>{ad.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Do you want to delete this admin?</h3>
                        <button onClick={handleDelete} className="confirm-btn">Yes</button>
                        <button onClick={closeDeleteModal} className="cancel-btn">Cancel</button>
                    </div>
                </div>
            )}

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Select User to Grant Admin Rights</h2>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search user by name or id..."
                                value={searchModal}
                                onChange={(e) => setSearchModal(e.target.value)}
                            />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecordsModal.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button onClick={() => grantAdmin(user.id)}><GiTeamUpgrade /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination currentPage={currentPageModal} totalPages={totalPagesModal} onPageChange={handlePageChangeModal} />
                        <button onClick={closeAddModal} className="cancel-btn">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminManagement;
