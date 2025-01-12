import React, { useState } from "react";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { MdDelete } from "react-icons/md";

const Comments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      content: "Hay quá!",
      userId: 101,
      chapterId: 1001,
      storyName: "Truyện A",
      createdAt: "2023-12-01",
    },
    {
      id: 2,
      content: "Chương này rất cảm động.",
      userId: 102,
      chapterId: 1002,
      storyName: "Truyện B",
      createdAt: "2023-12-02",
    },
    {
      id: 3,
      content: "Kết thúc có hậu quá!",
      userId: 103,
      chapterId: 1003,
      storyName: "Truyện A",
      createdAt: "2023-12-01",
    },
    {
      id: 4,
      content: "Đọc xong chương này xúc động quá.",
      userId: 104,
      chapterId: 1004,
      storyName: "Truyện C",
      createdAt: "2023-12-03",
    },
  ]);

  const [filteredComments, setFilteredComments] = useState(comments);
  const [search, setSearch] = useState(""); // Tìm kiếm theo tên truyện
  const [timeFilter, setTimeFilter] = useState(""); // Lọc theo thời gian
  const [exactDate, setExactDate] = useState(""); // Lọc theo ngày chính xác
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  const totalPages = Math.ceil(filteredComments.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredComments.slice(indexOfFirstRecord, indexOfLastRecord);

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
                    onClick={() => handleDelete(comment.id)}
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
    </div>
  );
};

export default Comments;
