import React, { useState } from "react";
import "./SideBar.css";
import logo from "../logo.jpg";
import { FaBars, FaUserFriends, FaBook, FaComments, FaRegFlag, FaClipboard } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarColor, setSidebarColor] = useState("#ffc0cb");
  const navigate = useNavigate(); // Sử dụng điều hướng

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const changeSidebarColor = (color) => {
    setSidebarColor(color);
  };

  const handleNavigation = (path) => {
    setIsOpen(false); // Thu gọn sidebar
    navigate(path); // Điều hướng đến trang tương ứng
  };

  return (
    <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
      {/* Nút FaBars nằm trên cùng */}
      <FaBars className="menu-icon" onClick={toggleSidebar} />
      <div
        className={`sidebar ${isOpen ? "open" : ""}`}
        style={{ backgroundColor: sidebarColor }}
      >
        <div className="top-section">
          {isOpen && <img src={logo} alt="Logo" className="logo" />}
        </div>
        <div className="menu">
          <ul>
            <li className="menu-item" onClick={() => handleNavigation("/Dashboard")}>
              <FaClipboard />
              {isOpen && <span>Dashboard</span>}
            </li>
            <li className="menu-item" onClick={() => handleNavigation("/Users")}>
              <FaUserFriends />
              {isOpen && <span>Users Management</span>}
            </li>
            <li className="menu-item" onClick={() => handleNavigation("/Books")}>
              <FaBook />
              {isOpen && <span>Books Management</span>}
            </li>
            <li className="menu-item" onClick={() => handleNavigation("/Comments")}>
              <FaComments />
              {isOpen && <span>Comments</span>}
            </li>
            <li className="menu-item" onClick={() => handleNavigation("/Reports")}>
              <FaRegFlag />
              {isOpen && <span>Report Handling</span>}
            </li>
            <li className="menu-item" onClick={() => handleNavigation("/Settings")}>
              <IoIosSettings />
              {isOpen && <span>Settings</span>}
            </li>
          </ul>
        </div>
        <div className={`bottom ${isOpen ? "open" : ""}`}>
          <div
            className="color-option"
            onClick={() => changeSidebarColor("#ffc0cb")}
          ></div>
          <div
            className="color-option"
            onClick={() => changeSidebarColor("aquamarine")}
          ></div>
          <div
            className="color-option"
            onClick={() => changeSidebarColor("aqua")}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
