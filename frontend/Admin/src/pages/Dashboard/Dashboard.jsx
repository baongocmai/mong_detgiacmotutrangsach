import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Cards from "./Cards.jsx";

const Dashboard = () => {
  const [newUsers, setNewUsers] = useState([]);
  const [newStories, setNewStories] = useState([]);

  // Fetch new users who joined in the last 24 hours
  const fetchNewUsers = async () => {
    try {
      const response = await fetch("/api/new-users"); // Adjust the API endpoint as needed
      const data = await response.json();
      setNewUsers(data);
    } catch (error) {
      console.error("Error fetching new users:", error);
    }
  };

  // Fetch new stories posted in the last 24 hours
  const fetchNewStories = async () => {
    try {
      const response = await fetch("/http://localhost:8000/new-stories"); // Adjust the API endpoint as needed
      const data = await response.json();
      setNewStories(data);
    } catch (error) {
      console.error("Error fetching new stories:", error);
    }
  };

  // Fetch data on initial load and then periodically (every 24 hours)
  useEffect(() => {
    fetchNewUsers();
    fetchNewStories();

    const userInterval = setInterval(fetchNewUsers, 86400000); // Update every 24 hours (86400000ms)
    const storyInterval = setInterval(fetchNewStories, 86400000); // Update every 24 hours (86400000ms)

    // Cleanup intervals when component unmounts
    return () => {
      clearInterval(userInterval);
      clearInterval(storyInterval);
    };
  }, []);

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="overview">
        <div className="left">
          <Cards />
          <div className="statistics">
            <p style={{ color: "brown", fontSize: "20px", fontWeight: "bold" }}>New Stories in Last 24 Hours</p>
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
                {newStories.map((story) => (
                  <tr key={story.id}>
                    <td>{story.id}</td>
                    <td>{story.title}</td>
                    <td>{story.username}</td>
                    <td>{story.createAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="right">
          <p style={{ color: "brown", fontSize: "20px", fontWeight: "bold" }}>Update</p>
          <div style={{ background: "pink" }}>
            <ul>
              {newUsers.map((user, index) => (
                <li key={index}>
                  {user.username} đã tham gia nền tảng vào {user.joinedAt}
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
