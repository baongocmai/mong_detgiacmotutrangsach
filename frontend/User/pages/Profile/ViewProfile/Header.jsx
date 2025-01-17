import React, { useState, useEffect } from "react";
import logo from "../../../image/logo/mongLogo.png";
import "./Header.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaUserAstronaut } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
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

    const handleSignIn = () => setIsLoggedIn(true);

    const handleLogout = () => setIsLoggedIn(false);

    return (
        <header className="header">
           
            <div className="header-top">
    <div className="header-left">
        <Link to="/"><img src={logo} alt="Mộng Logo" className="logo2" /></Link>  
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
                <button className="btn sign-in" onClick={handleSignIn}>SIGN IN</button>
                <button className="btn sign-up">SIGN UP</button>
            </>
        ) : (
            <button className="btn username-btn">
                
                <FaUserAstronaut className="user-icon" />
                <Link to="/viewProfile">{username}</Link>
            </button>
        )}
    </div>
</div>


        </header>
    );
};

export default Header;
