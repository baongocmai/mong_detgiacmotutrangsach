import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Cards from "./Cards.jsx";
import Pagination from '../../components/Pagination/Pagination';

const Dashboard = () => {
  const [newUsers, setNewUsers] = useState([]);
  const [newStories, setNewStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 5; // Số lượng stories hiển thị trên mỗi trang

  const fetchRecentData = async () => {
    try {
      const response = await fetch("http://api:8000/api/dashboard/recent");
      const data = await response.json();
      setNewUsers(data.recent_users || []);
      setNewStories(data.recent_stories || []);
    } catch (error) {
      console.error("Error fetching recent data:", error);
    }
  };
  useEffect(() => {
    fetchRecentData(); // Gọi trực tiếp hàm fetchRecentData
  }, []);
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedStories = newStories.slice(
    (currentPage - 1) * storiesPerPage,
    currentPage * storiesPerPage
  );

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="overview">
        <div className="left">
          <Cards />
          <div className="statistics">
            <p style={{ color: "brown", fontSize: "20px", fontWeight: "bold" }}>
              New Stories in Last 24 Hours
            </p>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Username</th>
                  <th>Create At</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStories.map((story) => (
                  <tr key={story.id}>
                    <td>{story.id}</td>
                    <td>{story.title}</td>
                    <td>{story.username}</td>
                    <td>{story.createAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(newStories.length / storiesPerPage)}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        <div className="right">
          <p style={{ color: "brown", fontSize: "20px", fontWeight: "bold" }}>
            Update
          </p>
          <div style={{ background: "pink" }}>
            <ul>
              {newUsers.map((user, index) => (
                <li key={index}>
                  {user.username} đã tham gia vào{" "}
                  {new Date(user.created_at).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
