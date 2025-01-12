import React, { useState } from "react";
import Pagination from "../../components/Pagination/Pagination.jsx";
import "./Categories.css";
import { MdDelete } from "react-icons/md";

const Categories = () => {
    const [categories, setCategories] = useState([
        { id: 1, name: "Tiên hiệp", quantity: 54, description: "" },
        { id: 2, name: "Trọng sinh", quantity: 30, description: "" },
        { id: 3, name: "Đam mỹ", quantity: 52, description: "" },
        { id: 4, name: "Ngôn tình", quantity: 10, description: "" },
        { id: 5, name: "Hài hước", quantity: 12, description: "" },
        { id: 6, name: "Khoa học viễn tưởng", quantity: 91, description: "" },
        { id: 7, name: "Kinh dị", quantity: 22, description: "" },
    ]);

    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("asc");
    const [newCategory, setNewCategory] = useState({ name: "", description: "" });

    // Modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const recordsPerPage = 10;
    const totalPages = Math.ceil(filteredCategories.length / recordsPerPage);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredCategories.slice(indexOfFirstRecord, indexOfLastRecord);

    const handleSearch = () => {
        const result = categories.filter((category) =>
            category.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredCategories(result);
    };

    const handleSort = (order) => {
        setSortOrder(order);
        const sortedCategories = [...filteredCategories].sort((a, b) => {
            return order === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity;
        });
        setFilteredCategories(sortedCategories);
    };

    const handleAddCategory = () => {
        if (!newCategory.name.trim() || !newCategory.description.trim()) {
            alert("Name and Description are required!");
            return;
        }

        const newId = categories.length ? categories[categories.length - 1].id + 1 : 1;
        const newCategoryItem = {
            id: newId,
            name: newCategory.name.trim(),
            description: newCategory.description.trim(),
            quantity: 0,
        };

        setCategories([...categories, newCategoryItem]);
        setFilteredCategories([...categories, newCategoryItem]);
        setNewCategory({ name: "", description: "" });
    };

    const openDeleteModal = (categoryId) => {
        setCategoryToDelete(categoryId);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setCategoryToDelete(null);
    };

    const handleDelete = () => {
        const updatedCategories = categories.filter((category) => category.id !== categoryToDelete);
        setCategories(updatedCategories);
        setFilteredCategories(updatedCategories);
        closeDeleteModal();
    };

    return (
        <div className="container">
            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* Sort Buttons */}
            <div className="sort-container">
                <button onClick={() => handleSort("asc")}>Low to High</button>
                <button onClick={() => handleSort("desc")}>High to Low</button>
            </div>

            {/* Add Category Form */}
            <div className="add-form">
                <input
                    type="text"
                    placeholder="Category name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
                <button onClick={handleAddCategory}>Add</button>
            </div>

            {/* Category Table */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>{category.quantity}</td>
                            <td>
                                <button
                                    className="icon"
                                    onClick={() => openDeleteModal(category.id)}
                                >
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Component */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Do you want to delete this category?</h3>
                        <p>
                            <strong>
                                {categories.find((cat) => cat.id === categoryToDelete)?.name}
                            </strong>
                        </p>
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

export default Categories;
