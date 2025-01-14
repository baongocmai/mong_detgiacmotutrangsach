import React, { useState, useEffect } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { BiReset } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminAccount.css";

const AdminAccount = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [adminData, setAdminData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get("http://localhost:8000/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAdminData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching admin data:", error);
                navigate("/login");
            }
        };

        fetchAdminData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="view-profile">
            <div className="profile-container">
                <div className="profile-header">
                    <div className="avatar">
                        <FaUserAstronaut className="avatar-icon" />
                    </div>
                    <h2>{adminData.full_name}</h2>
                    <div className="profile-details">
                        <p>Email: {adminData.email}</p>
                        <p>Username: {adminData.username}</p>
                        <p>Role: {adminData.role}</p>
                        <div className="profile-actions">
                            <button
                                className="btn reset-button"
                                onClick={() => navigate("/reset")}
                            >
                                <BiReset className="icon" /> Reset
                            </button>
                            <button
                                className="btn logout-button"
                                onClick={handleLogout}
                            >
                                <IoIosLogOut className="icon" /> ĐĂNG XUẤT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAccount;
