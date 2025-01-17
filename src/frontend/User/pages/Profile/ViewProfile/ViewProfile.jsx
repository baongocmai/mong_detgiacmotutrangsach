import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaRegFolderOpen, FaUserAstronaut, FaSyncAlt } from "react-icons/fa";
import { BiReset } from "react-icons/bi";
import "./ViewProfile.css";

const ViewProfile = () => {
  const { idUser } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`http://3.26.145.187:8000/api/users/me`, {
            headers: { "Authorization": `Bearer ${token}` },
          });
          const data = await response.json();
          setUserProfile(data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      fetchUserProfile();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("idUser");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("idUser"); // Remove user data on logout
      navigate("/login"); 
  }
  const handleRedirect = () => {
    if (userProfile.role === "ADMIN" || userProfile.role === "SUPERADMIN") {
      navigate("/admin/dashboard");
    } else {
      alert("Permission Denied: You do not have access to this page.");
    }
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-profile">
      <div className={`profile-container ${isDropdownOpen ? "dropdown-open" : ""}`}>
        <div className={`profile-left ${isDropdownOpen ? "expanded" : ""}`}>
          <button className="dropdown-toggle-btn" onClick={toggleDropdown}>☰</button>
          <div className={`dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
            <button className="dropdown-item" onClick={() => navigate("/myStories")}>
              <FaRegFolderOpen /> Quản lý truyện
            </button>
            <button className="dropdown-item" onClick={() => navigate("/postStory")}>
              <FaEdit /> Đăng truyện
            </button>
            <button className="dropdown-item" onClick={() => navigate("/reset")}>
              <BiReset /> Đổi mật khẩu
            </button>
            <button className="dropdown-item" onClick={handleLogOut}>
              <FaSyncAlt /> Đăng xuất
            </button>
            <button className="dropdown-item" onClick={handleRedirect}>
              <FaSyncAlt /> Chuyển trang
            </button>
          </div>
        </div>

        <div className="profile-center">
          <FaUserAstronaut className="profile-avatar" />
          <h2 className="profile-name">{userProfile.username}</h2>
        </div>

        <div className="profile-right">
          <h3>Thông tin người dùng</h3>
          <ul>
            <li>Email: {userProfile.email}</li>
            <li>Số truyện đã đăng: {userProfile.stories?.length || 0}</li>
            <li>Số truyện yêu thích: {userProfile.favorites?.length || 0}</li>
            <li>Số lần vi phạm: {userProfile.reports?.length || 0}</li>
          </ul>
        </div>
      </div>

      <div className="featured-wrapper">
        <button className="bun tagbooks">
          <h2 className="section-title">KHO YÊU THÍCH </h2>
        </button>
        <div className="featured-section">
          {userProfile.favorites && userProfile.favorites.length > 0 ? (
            userProfile.favorites.map((book, index) => (
              <div key={index} className="book-card">
                <img src={book.img} alt={book.title} className="book-image" />
                <h3 className="book-title">{book.title}</h3>
                <div className="tags">
                  {book.status.map((status, i) => (
                    <span key={i} className={`tag ${status.toLowerCase()}`}>
                      {status}
                    </span>
                  ))}
                </div>
                <div className="rating">⭐ {book.rating.toFixed(1)}</div>
              </div>
            ))
          ) : (
            <p className="no-books">Không còn truyện nào trong danh sách yêu thích.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
