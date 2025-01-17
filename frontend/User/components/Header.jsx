import React, { useState, useEffect } from "react";
import logo from "../image/logo/mongLogo.png";
import "./Header.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaUserAstronaut } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("Mong User");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Xử lý khi nhấn Enter
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    useEffect(() => {
        const toggleSwitch = document.getElementById("theme-toggle");
        const currentTheme = localStorage.getItem("theme");

        if (currentTheme === "dark") {
            document.body.classList.add("dark-mode");
            toggleSwitch.checked = true;
        }

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

    const handleSignIn = () => setIsLoggedIn(true);
    const handleSignUp = () => setIsLoggedIn(false);

    const handleLogout = () => setIsLoggedIn(false);

    return (
        <header className="header">
           
            <div className="header-top">
            <div className="header-left">
            <Link to="/"><img src={logo} alt="Mộng Logo" className="logo" /></Link>  
    </div>
    <div className="header-center">
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search here..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown} // Thêm sự kiện lắng nghe phím Enter
            />
            <button className="search-button" onClick={handleSearch}>
                <i className="fa fa-search"></i>
            </button>
        </div>
    </div>
    <div className="header-right">
        {!isLoggedIn ? (
            <>
                <button className="btnn username-btnn" onClick={handleSignIn}>
                    <Link to="/">SIGN IN</Link>
                </button>
                <button className="btnn username-btnn" onClick={handleSignUp}>
                    <Link to="/">SIGN UP</Link>
                </button>

            </>
        ) : (
            <button className="btnn username-btnn" onClick={handleLogout}>
                
                <FaUserAstronaut className="user-icon" />
                <Link to="/viewProfile">{username}</Link>
            </button>
        )}
    </div>
</div>

 <div className="header-bottom">
                <nav className="nav-menu">
                    <Link to="/" className="nav-item">HOME</Link>
                    <Link to="/review" className="nav-item">REVIEW</Link>
                    <div className="nav-item info-menu">
                        INFO
                        <div className="submenu">
                            <div className="subsubmenu">
                                <Link to="/guide" className="submenu-item">Hướng dẫn</Link>
                            </div>
                            <div className="subsubmenu">
                                <Link to="/quydinh" className="submenu-item">Quy định</Link>
                            </div>
                            <div className="subsubmenu">
                                <Link to="/contact" className="submenu-item">Liên hệ</Link>
                            </div>
                        </div>
                    </div>
                    <div className="nav-item info-menu">
                        CATEGORY
                        <div className="submenu">
                            <div className="subsubmenu">
                                <Link to="/novel" className="submenu-item">Tiểu thuyết</Link>
                            </div>
                            <div className="subsubmenu">
                                <Link to="/vanhocVN" className="submenu-item">Văn học Việt Nam</Link>
                
                            </div>
                            <div className="subsubmenu">
                            <Link to="/vanhocnn" className="submenu-item">Văn học nước ngoài</Link>
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
