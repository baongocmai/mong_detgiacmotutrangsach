import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">Total Users: 1,250</div>
        <div className="card">Total Sales: $58,300</div>
        <div className="card">Pending Orders: 47</div>
        <div className="card">Support Tickets: 15</div>
      </div>
      <div className="dashboard-charts">
        <div className="chart">Sales Chart</div>
        <div className="chart">Users Chart</div>
      </div>
    </div>
  );
};

export default Dashboard;
