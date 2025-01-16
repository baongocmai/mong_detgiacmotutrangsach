import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { FaSearch, FaUserAstronaut } from "react-icons/fa";
import light from "./light.png"; // Light mode image
import dark from "./dark.png"; // Dark mode image
import { IoIosNotifications, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiNavigationFill } from "react-icons/ri";
import nav_bg from "./nav_bg.png";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      const searchRoutes = {
        dashboard: "/Dashboard",
        users: "/Users",
        settings: "/Settings",
        stories: "/Stories",
        reports: "/Report",
        comments: "/Comments",
        admin: "/AdminManagement",
      };

      const searchKey = searchTerm.toLowerCase();
      const matchedRoute = Object.keys(searchRoutes).find((key) =>
        key.includes(searchKey)
      );

      if (matchedRoute) {
        navigate(searchRoutes[matchedRoute]);
      } else {
        alert("No matching page found!");
      }
      setSearchTerm("");
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.remove("dark-mode");
    } else {
      document.body.classList.add("dark-mode");
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuAction = (action) => {
    if (action === "viewProfile") {
      navigate("/AdminAccount");
    } else if (action === "logout") {
      navigate("/login");
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="navbar">
      <div className="wrapper-i">
        <button className="logo-btn" onClick={() => navigate("/")}
          style={{
            backgroundImage: `url(${nav_bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}>
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
            <div
              className="switch"
              style={{
                backgroundImage: isDarkMode ? `url(${dark})` : `url(${light})`,
              }}
            >
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                id="darkModeSwitch"
              />
              <label htmlFor="darkModeSwitch"></label>
            </div>
          </div>
          <div className="item">
            <IoIosNotifications />
          </div>
          <div className="item">
            <div className="a">
              <FaUserAstronaut className="a-icon" />
            </div>
            {isDropdownOpen ? (
              <IoIosArrowUp
                className="arrow"
                onClick={() => setIsDropdownOpen(false)}
              />
            ) : (
              <IoIosArrowDown
                className="arrow"
                onClick={() => setIsDropdownOpen(true)}
              />
            )}
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li onClick={() => handleMenuAction("viewProfile")}>
                    View Profile
                  </li>
                  <li onClick={() => handleMenuAction("logout")}>Logout</li>
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
