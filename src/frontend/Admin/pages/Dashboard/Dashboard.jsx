import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Cards from "./Cards.jsx";

const Dashboard = () => {
  const [newUsers, setNewUsers] = useState([]);
  const [newStories, setNewStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 5;

  const fetchRecentData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");
  
      const response = await fetch("http://3.26.145.187:8000/api/dashboard/recent", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      console.log("API Data:", data);
      setNewUsers(data.recent_users || []);
      setNewStories(data.recent_stories || []);
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };
  
  useEffect(() => {
    fetchRecentData();
  }, []);

  useEffect(() => {
    console.log("New Users:", newUsers);  // Kiểm tra dữ liệu người dùng
    console.log("New Stories:", newStories);  // Kiểm tra dữ liệu truyện
  }, [newUsers, newStories]);


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
                    <td>{new Date(story.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
        <div className="right">
          <p style={{ color: "brown", fontSize: "20px", fontWeight: "bold" }}>
            Update
          </p>
          <div style={{ background: "pink", padding: "10px", borderRadius: "8px" }}>
            {newUsers.length === 0 ? (
              <p>No new users found.</p>
            ) : (
              <ul>
                {newUsers.map((user, index) => (
                  <li key={index}>
                    {user.username} đã tham gia vào nền tảng lúc{" "}
                    {new Date(user.created_at).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
