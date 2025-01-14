import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('role', data.role);
                alert('Login successful!');
    
                // Điều hướng tới home
                window.location.href = '/Dashboard'; 
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
