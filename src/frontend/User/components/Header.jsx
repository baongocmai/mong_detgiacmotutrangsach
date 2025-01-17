import React, { useState, useEffect } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../image/logo/mongLogo.png";
import "./Header.css";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Đặt mặc định là chưa đăng nhập
    const [username, setUsername] = useState("Mong User");
    const [searchQuery, setSearchQuery] = useState("");
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // Trạng thái theme
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra token trong localStorage và xác nhận đăng nhập
        const token = localStorage.getItem("token");
        const savedUsername = localStorage.getItem("username");

        if (token && savedUsername) {
            setIsLoggedIn(true);
            setUsername(savedUsername);
        }
    const toggleSwitch = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    // Áp dụng theme từ localStorage
    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        toggleSwitch.checked = true;
    } else {
        document.body.classList.remove("dark-mode");
        toggleSwitch.checked = false;
    }

    // Thêm sự kiện lắng nghe thay đổi của công tắc chuyển đổi chế độ
    const handleThemeChange = () => {
        if (toggleSwitch.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    };

    toggleSwitch.addEventListener("change", handleThemeChange);

    // Cleanup (gỡ bỏ sự kiện khi component bị hủy)
    return () => {
        toggleSwitch.removeEventListener("change", handleThemeChange);
    };
}, []);

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleSignIn = () => {
        navigate("/login");
    };

    const handleSignUp = () => {
        navigate("/register");
    };

    const handleProfileClick = () => {
        if (isLoggedIn && username) {
            navigate("/viewProfile");
        } else {
            navigate("/login");
        }
    };

    return (
        <header className="header">
            <div className="header-top">
                <div className="header-left">
                    <Link to="/">
                        <img src={logo} alt="Mộng Logo" className="logo2" />
                    </Link>
                </div>
                <div className="header-center">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button className="search-button" onClick={handleSearch}>
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
                <div className="header-right">

                    {!isLoggedIn ? (
                        <>
                            <button className="btn sign-in" onClick={handleSignIn}>
                                SIGN IN
                            </button>
                            <button className="btn sign-up" onClick={handleSignUp}>
                                SIGN UP
                            </button>
                        </>
                    ) : (
                        <button className="btn username-btn" onClick={handleProfileClick}>
                            <FaUserAstronaut className="user-icon" />
                            {username}
                        </button>
                    )}
                </div>
            </div>

            <div className="header-bottom">
                <nav className="nav-menu">
                    <Link to="/" className="nav-item">
                        HOME
                    </Link>
                    <Link to="/review" className="nav-item">
                        REVIEW
                    </Link>
                    <div className="nav-item info-menu">
                        INFO
                        <div className="submenu">
                            <div className="subsubmenu">
                                <Link to="/guide" className="submenu-item">
                                    Hướng dẫn
                                </Link>
                            </div>
                            <div className="subsubmenu">
                                <Link to="/quydinh" className="submenu-item">
                                    Quy định
                                </Link>
                            </div>
                            <div className="subsubmenu">
                                <Link to="/contact" className="submenu-item">
                                    Liên hệ
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="nav-item info-menu">
                        CATEGORY
                        <div className="submenu">
                            <div className="subsubmenu">
                                <Link to="/novel" className="submenu-item">
                                    Tiểu thuyết
                                </Link>
                            </div>
                            <div className="subsubmenu">
                                <Link to="/vanhocVN" className="submenu-item">
                                    Văn học Việt Nam
                                </Link>
                            </div>
                            <div className="subsubmenu">
                                <Link to="/vanhocnn" className="submenu-item">
                                    Văn học nước ngoài
                                </Link>
                            </div>
                        </div>
                    </div>
                    </nav>
                <div className="theme-toggle">
                    <i className="fas fa-sun theme-icon" id="light-icon"></i>
                    <label className="switch">
                        <input type="checkbox" id="theme-toggle" />
                        <span className="slider"></span>
                    </label>
                    <i className="fas fa-moon theme-icon" id="dark-icon"></i>
                </div>
            </div>
        </header>
    );
};

export default Header;
