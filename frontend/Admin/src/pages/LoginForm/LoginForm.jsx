import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";  // Use useNavigate instead of useHistory

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook
    const handleNavigation = (path) => {
        navigate(path); // Điều hướng đến trang tương ứng
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://mong_detgiacmotutrangsach-backend-1:8000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('role', data.role); // Lưu vai trò người dùng
                console.log('Login successful, redirecting to Dashboard...');
                
                // Đảm bảo điều hướng đúng
                navigate('/Dashboard'); // Chuyển hướng về trang Dashboard
            } else {
                alert('Invalid email or password! Please try again');
            }
        } catch (error) {
            console.error("Error calling API:", error);
            alert('An error occurred during login. Please try again later!');
        }
    };
    
    

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Welcome back,</h1>
                <h2>Please login to your account below</h2>
                <div className="input-box">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        required  
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" /> Remember me</label>
                    <Link to="/forgot" className="custom-link">Forgot password?</Link>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
