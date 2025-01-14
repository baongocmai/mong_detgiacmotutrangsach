import React, { useState } from "react";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { MdDelete } from "react-icons/md";

const Genres = () => {
    const [genres, setGenres] = useState([
        { id: 1, name: "Hài Hước", quantity: 12, description: "Vô cùng buồn cười" },
        { id: 2, name: "Trọng sinh", quantity: 30, description: "" },
        { id: 3, name: "Đam mỹ", quantity: 52, description: "" },
        { id: 4, name: "Ngôn tình", quantity: 10, description: "" },
        { id: 6, name: "Khoa học viễn tưởng", quantity: 91, description: "" },
        { id: 7, name: "Kinh dị", quantity: 22, description: "" },
    ]);

    const [filteredGenres, setFilteredGenres] = useState(genres);

    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [newGenre, setNewGenre] = useState({ name: "", description: "" });

    // Modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [genreToDelete, setGenreToDelete] = useState(null);

    const recordsPerPage = 10;
    const totalPages = Math.ceil(filteredGenres.length / recordsPerPage);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredGenres.slice(indexOfFirstRecord, indexOfLastRecord);

    const handleSearch = () => {
        const result = genres.filter((genre) =>
            genre.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredGenres(result);
    };

    const handleSort = (order) => {
        setSortOrder(order);
        const sortedGenres = [...filteredGenres].sort((a, b) => {
            return order === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity;
        });
        setFilteredGenres(sortedGenres);
    };

    const handleAddGenre = () => {
        if (!newGenre.name.trim() || !newGenre.description.trim()) {
            alert("Name and Description are required!");
            return;
        }

        const newId = genres.length ? genres[genres.length - 1].id + 1 : 1;
        const updatedGenres = [
            ...genres,
            { id: newId, name: newGenre.name.trim(), description: newGenre.description.trim() },
        ];

        setGenres(updatedGenres);
        setFilteredGenres(updatedGenres);

        setNewGenre({ name: "", description: "" });
    };

    const openDeleteModal = (genreId) => {
        setGenreToDelete(genreId);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setGenreToDelete(null);
    };

    const handleDelete = () => {
        const updatedGenres = genres.filter((genre) => genre.id !== genreToDelete);
        setGenres(updatedGenres);
        setFilteredGenres(updatedGenres);
        closeDeleteModal();
    };

    return (
        <div className="container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="sort-container">
                <button onClick={() => handleSort("asc")}>Low to High</button>
                <button onClick={() => handleSort("desc")}>High to Low</button>
            </div>

            {/* Add genre form */}
            <div className="add-form">
                <input
                    type="text"
                    placeholder="Genre name"
                    value={newGenre.name}
                    onChange={(e) => setNewGenre({ ...newGenre, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newGenre.description}
                    onChange={(e) => setNewGenre({ ...newGenre, description: e.target.value })}
                />
                <button onClick={handleAddGenre}>Add</button>
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
                    {currentRecords.map((genre) => (
                        <tr key={genre.id}>
                            <td>{genre.id}</td>
                            <td>{genre.name}</td>
                            <td>{genre.description}</td>
                            <td>{genre.quantity}</td>
                            <td>
                                <button
                                    className="icon"
                                    onClick={() => openDeleteModal(genre.id)}
                                >
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
                onPageChange={setCurrentPage}
            />

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Do you want to delete this genre?</h3>
                        <p>
                            <strong>
                                {genres.find((genre) => genre.id === genreToDelete)?.name}
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

export default Genres;
