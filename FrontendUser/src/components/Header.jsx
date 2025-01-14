import React, { useState, useEffect } from "react";
import logo from "../image/logo/mongLogo.png";
import "./Header.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaUserAstronaut } from "react-icons/fa";

const Header = () => {
    // State để theo dõi trạng thái đăng nhập
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("Mong User");

    useEffect(() => {
        const toggleSwitch = document.getElementById("theme-toggle");
        const currentTheme = localStorage.getItem("theme");

        // Áp dụng trạng thái theme từ localStorage
        if (currentTheme === "dark") {
            document.body.classList.add("dark-mode");
            toggleSwitch.checked = true;
        }

        // Lắng nghe sự kiện chuyển đổi
        toggleSwitch.addEventListener("change", () => {
            if (toggleSwitch.checked) {
                document.body.classList.add("dark-mode");
                localStorage.setItem("theme", "dark");
            } else {
                document.body.classList.remove("dark-mode");
                localStorage.setItem("theme", "light");
            }
        });
    }, []);

    // Hàm xử lý đăng nhập
    const handleSignIn = () => {
        // Giả lập trạng thái đăng nhập thành công
        setIsLoggedIn(true);
    };

    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <header className="header">
            {/* Logo */}
            <div className="header-left">
                <img src={logo} alt="Mộng Logo" className="logo" />
            </div>

            {/* Nút SIGN IN/SIGN UP hoặc USERNAME */}
            <div className="header-top">
                <div className="header-right">
                    {!isLoggedIn ? (
                        <>
                            <button className="btn sign-in" onClick={handleSignIn}>SIGN IN</button>
                            <button className="btn sign-up">SIGN UP</button>
                        </>
                    ) : (
                        <button className="btn username-btn" onClick={handleLogout}>
                            <FaUserAstronaut className="user-icon" />
                            <span>{username}</span>
                        </button>

                    )}
                </div>
            </div>

            {/* Thanh tìm kiếm */}
            <div className="header-center">
                <div className="search-bar">
                    <input type="text" placeholder="Search here..." className="search-input" />
                    <button className="search-button">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>

            {/* Menu và công tắc đổi chế độ */}
            <div className="header-bottom">
                <nav className="nav-menu">
                    <a href="#home" className="nav-item">HOME</a>
                    <a href="#review" className="nav-item">REVIEW</a>
                    <div className="nav-item info-menu">
                        INFO
                        <div className="submenu">
                            <div className="subsubmenu"> <a href="#rules" className="submenu-item">Quy định</a> </div>
                            <div className="subsubmenu"> <a href="#rules" className="submenu-item">Hướng dẫn</a> </div>
                            <div className="subsubmenu"> <a href="#rules" className="submenu-item">Liên hệ</a> </div>
                        </div>
                    </div>
                    <div className="nav-item info-menu">
                        CATEGORY
                        <div className="submenu">
                            <div className="subsubmenu"> <a href="#rules" className="submenu-item">Tiểu thuyết</a> </div>
                            <div className="subsubmenu"> <a href="#rules" className="submenu-item">Văn học Việt Nam</a> </div>
                            <div className="subsubmenu"> <a href="#rules" className="submenu-item">Văn học nước ngoài</a> </div>
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
