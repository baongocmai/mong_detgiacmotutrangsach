import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { FaSearch, FaUserAstronaut } from "react-icons/fa";
import { IoIosNotifications, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiNavigationFill } from "react-icons/ri";
import nav_bg from "./nav_bg.png";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const trimmedSearchTerm = searchTerm?.trim(); // Trim any extra spaces and ensure it's not undefined or null
      if (trimmedSearchTerm) {
        const searchRoutes = {
          dashboard: "/admin/dashboard",
          users: "/admin/users",
          settings: "/admin/settings",
          stories: "/admin/stories",
          reports: "/admin/report",
          comments: "/admin/comments",
          admin: "/admin/management",
        };
  
        const searchKey = trimmedSearchTerm.toLowerCase(); // Ensure search term is valid and lowercase
        const matchedRoute = Object.keys(searchRoutes).find((key) =>
          key.includes(searchKey)
        );
  
        if (matchedRoute) {
          navigate(searchRoutes[matchedRoute]);
        } else {
          alert("No matching page found!");
        }
        setSearchTerm(""); // Reset search term after search
      } else {
        alert("Please enter a valid search term.");
      }
    }
  };
  
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuAction = (action) => {
    if (action === "viewProfile") {
      navigate(`/viewProfile/${localStorage.getItem('idUser')}`); // Redirect to the user's profile
    } else if (action === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("idUser"); // Remove user data on logout
      navigate("/login"); // Redirect to login page
    }
    setIsDropdownOpen(false); // Close dropdown after action
  };

  return (
    <div className="navbar">
      <div className="wrapper-i">
        <button
          className="logo-btn"
          onClick={() => navigate("/")}
          style={{
            backgroundImage: `url(${nav_bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <RiNavigationFill /> redirect
        </button>

        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
          <FaSearch />
        </div>

        <div className="items">
          <div className="item">
            <IoIosNotifications />
          </div>
          <div className="item">
            <button
              className="avatar-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
            >
              <FaUserAstronaut />
            </button>
            {isDropdownOpen ? (
              <IoIosArrowUp
                className="arrow"
                onClick={() => setIsDropdownOpen(false)} // Close dropdown
              />
            ) : (
              <IoIosArrowDown
                className="arrow"
                onClick={() => setIsDropdownOpen(true)} // Open dropdown
              />
            )}
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <button onClick={() => handleMenuAction("viewProfile")}>
                      View Profile
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleMenuAction("logout")}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
