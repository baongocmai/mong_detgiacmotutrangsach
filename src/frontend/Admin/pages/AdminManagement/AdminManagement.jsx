import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { MdDelete } from "react-icons/md";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { GiTeamUpgrade } from "react-icons/gi";

const AdminManagement = () => {
    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredAdmins, setFilteredAdmins] = useState([]);
    const [search, setSearch] = useState("");
    const [modalSearch, setModalSearch] = useState(""); // Separate search state for modal
    const [createdAtFilter, setCreatedAtFilter] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    // Fetch data from the backend
    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }
                const response = await axios.get('http://3.26.145.187:8000/api/superadmin/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Check if response.data.users exists before filtering
                if (response.data?.users) {
                    const adminUsers = response.data.users.filter(user => user.role === "ADMIN");
                    setAdmins(adminUsers);
                    setFilteredAdmins(adminUsers);
                } else {
                    console.error("No users data in response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching admins:", error);
                if (error.response?.status === 401) {
                    navigate("/login");
                }
            }
        };
        // Check if response data is valid before setting state
        const validateAndSetAdmins = (data) => {
            if (Array.isArray(data)) {
                const adminUsers = data.filter(user => 
                    user && user.role === "ADMIN" && 
                    typeof user.name === 'string' &&
                    user.id
                );
                setAdmins(adminUsers);
                setFilteredAdmins(adminUsers);
            } else {
                console.error("Invalid data format received:", data);
                setAdmins([]);
                setFilteredAdmins([]);
            }
        };

        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }
                const response = await axios.get('http://3.26.145.187:8000/api/superadmin/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Check if response.data.users exists before filtering
                if (response.data?.users) {
                    const nonAdminUsers = response.data.users.filter(user => user.role !== "ADMIN");
                    setUsers(nonAdminUsers);
                } else {
                    console.error("No users data in response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                if (error.response?.status === 401) {
                    navigate("/login");
                }
            }
        };

        fetchAdmins();
        fetchUsers();
    }, [navigate]);

    
    // Apply filters and search when the Apply button is clicked
    const applyFiltersAndSearch = () => {
        let filtered = [...admins];

        // Apply createdAt filter
        if (createdAtFilter) {
            filtered.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return createdAtFilter === "Newest" ? dateB - dateA : dateA - dateB;
            });
        }

        // Apply search filter
        if (search.trim()) {
            filtered = filtered.filter(admin =>
                admin.name.toLowerCase().includes(search.toLowerCase()) ||
                admin.id.toString().includes(search)
            );
        }

        setFilteredAdmins(filtered);
        setCurrentPage(1); // Reset to first page after applying filters
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const openDeleteModal = (adminId) => {
        setAdminToDelete(adminId);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setAdminToDelete(null);
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            // Send a PATCH request to change the role of the admin to 'USER'
            await axios.patch(`http://3.26.145.187:8000/api/superadmin/users/${adminToDelete}/role`, 
                { role: 'USER' },
                { headers: { Authorization: `Bearer ${token}` }}
            );
    
            // Update the admin lists
            const updatedAdmins = admins.filter(admin => admin.id !== adminToDelete);
            setAdmins(updatedAdmins);
            setFilteredAdmins(updatedAdmins);
            
            // Add the user back to the users list
            const demotedAdmin = admins.find(admin => admin.id === adminToDelete);
            if (demotedAdmin) {
                setUsers([...users, {...demotedAdmin, role: 'USER'}]);
            }
    
            closeDeleteModal();
        } catch (error) {
            console.error("Error changing admin role:", error);
            if (error.response?.status === 401) {
                navigate("/login");
            }
        }
    };

    const openAddModal = () => {
        setShowAddModal(true);
        setModalSearch(""); // Reset modal search when opening
    };

    const closeAddModal = () => {
        setShowAddModal(false);
        setModalSearch(""); // Reset modal search when closing
    };

    const grantAdmin = async (userId) => {
        const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
        try {
            const userToPromote = users.find(user => user.id === userId);
            if (userToPromote) {
                const response = await axios.patch(
                    `http://3.26.145.187:8000/api/superadmin/users/${userId}/role`,
                    { role: 'ADMIN' },
                    { headers: { Authorization: `Bearer ${token}` }}
                );

                // Update both admin lists
                const newAdmin = {...response.data, role: 'ADMIN'};
                setAdmins([...admins, newAdmin]);
                setFilteredAdmins([...filteredAdmins, newAdmin]);
                
                // Remove promoted user from users list
                setUsers(users.filter(user => user.id !== userId));
                
                closeAddModal();
            }
        } catch (error) {
            console.error("Error granting admin role:", error);
            if (error.response?.status === 401) {
                navigate("/login");
            }
        }
    };

    const totalPages = Math.ceil(filteredAdmins.length / recordsPerPage);
    const currentRecords = filteredAdmins.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(modalSearch.toLowerCase()) ||
        user.id.toString().includes(modalSearch)
    );

    return (
        <div className="container">
            <h1>Admin Management</h1>
            <div className="searchb">
                <input
                    type="text"
                    placeholder="Search by name or id..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="filter-containe">
                <select value={createdAtFilter} onChange={(e) => setCreatedAtFilter(e.target.value)}>
                    <option value="">Sort</option>
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                </select>
                <button onClick={applyFiltersAndSearch}>Apply</button>
            </div>

            <button onClick={openAddModal}>Add</button>

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
                    {currentRecords.map((admin) => (
                        <tr key={admin.id}>
                            <td>{admin.id}</td>
                            <td>{admin.name}</td>
                            <td>{admin.email}</td>
                            <td>
                                <button onClick={() => openDeleteModal(admin.id)}>
                                    <MdDelete />
                                </button>
                            </td>
                            <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Do you want to remove admin rights from this user?</h3>
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
                                value={modalSearch}
                                onChange={(e) => setModalSearch(e.target.value)}
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
                                {filteredUsers.map((user) => (
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
                        <button onClick={closeAddModal} className="cancel-btn">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminManagement;
