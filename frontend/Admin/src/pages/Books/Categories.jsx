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

    // State cho danh sách thể loại đã lọc
    const [filteredCategories, setFilteredCategories] = useState(categories);

    // Tìm kiếm
    const [search, setSearch] = useState("");
    
    const handleSearch = () => {
        const result = categories.filter((category) =>
            category.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredCategories(result); // Cập nhật filteredCategories thay vì categories
    };

    // Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const totalPages = Math.ceil(filteredCategories.length / recordsPerPage);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredCategories.slice(indexOfFirstRecord, indexOfLastRecord);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const [sortOrder, setSortOrder] = useState("asc"); 
    
    // lọc
    const handleSort = (order) => {
        setSortOrder(order);
        const sortedCatories = [...filteredCategories].sort((a, b) => {
            if (order === "asc") {
                return a.quantity - b.quantity; 
            } else {
                return b.quantity - a.quantity; 
            }
        });
        setFilteredCategories(sortedCatories);
    };

    // State và hàm xử lý cho việc thêm thể loại
    const [newCategory, setNewCategory] = useState({ name: "", description: "" });

    const handleAddCategory = () => {
        if (!newCategory.name.trim() || !newCategory.description.trim()) {
            alert("Name and Description are required!");
            return;
        }

        const newId = categories.length ? categories[categories.length - 1].id + 1 : 1;
        setCategories([
            ...categories,
            { id: newId, name: newCategory.name.trim(), description: newCategory.description.trim() },
        ]);
        setNewCategory({ name: "", description: "" });
    };

    return (
        <div className="container">
            {/* Tìm kiếm */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} // Only update search term, don't trigger filtering
                />
                <button onClick={handleSearch}>Search</button>  {/* Trigger search only when button is clicked */}
            </div>
            <div className="sort-container">
                <button onClick={() => handleSort("asc")}>Low to High</button>
                <button onClick={() => handleSort("desc")}>High to Low</button>
            </div>

            {/* Form thêm thể loại mới */}
            <div className="add-form">
                <input
                    type="text"
                    placeholder="Category name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
                <button onClick={handleAddCategory}>Add</button>
            </div>

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
                                <button>
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Categories;
