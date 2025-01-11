import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css"
import { FaSearch } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoIosNotifications, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ava from "./ava.png"
const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      const searchRoutes = {
        dashboard: "/Dashboard",
        users: "/Users",
        settings: "/Settings",
        books: "/Books",
        reports: "/Reports",
        comments: "/Comments",
      };

      const searchKey = searchTerm.toLowerCase();
      if (searchRoutes[searchKey]) {
        navigate(searchRoutes[searchKey]); // Điều hướng đến trang tương ứng
      } else {
        alert("No matching page found!"); // Nếu không tìm thấy trang
      }
      setSearchTerm(""); // Reset ô Search
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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Trạng thái để mở/đóng menu lựa chọn
  const handleMenuAction = (action) => {
    if (action === "viewProfile") {
      navigate("/AdminAccount");
    } else if (action === "logout") {
      navigate("/LoginForm");
    }
    setIsDropdownOpen(false); // Rút gọn dropdown
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/LoginForm"); // Điều hướng đến trang LoginForm
  };
  const handleViewProfile = () => {
    navigate("/AdminAccount"); // Điều hướng đến trang AdminAccount
  };

  return (
    <div className="navbar">
      <div className="wrapper-i">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch} // Gọi hàm khi nhấn Enter
          />
          <FaSearch />
        </div>
        <div className="items">
          <div className="item">
            {isDarkMode ? (
              <MdLightMode onClick={toggleDarkMode} />
            ) : (
              <MdDarkMode onClick={toggleDarkMode} />
            )}
          </div>
          <div className="item">
            <IoIosNotifications />
          </div>
          <div className="item">
            <img src={ava} alt="" className="avatar" />
            {isDropdownOpen ? (
              <IoIosArrowUp className="arrow" onClick={() => setIsDropdownOpen(false)} />
            ) : (
              <IoIosArrowDown className="arrow" onClick={() => setIsDropdownOpen(true)} />
            )}
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li onClick={() => handleMenuAction("viewProfile")}>View Profile</li>
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
export default NavBar