import React, {useState} from "react";
import "./LoginForm.css";
import { FaUser,FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            alert('Đăng nhập thành công!');
            // Redirect đến dashboard
            window.location.href = '/homepage';
        } else {
            alert('Tên đăng nhập hoặc mật khẩu không đúng! Vui lòng thử lại');
        }
    };
    return (
        <div className="wrapper">
            <form action="">
                <h1>Welcome back,</h1>
                <h2>Please login to your account below</h2>
                <div className="input-box">
                    <input type="text" placeholder="Username" required></input>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required></input>
                    <FaLock className="icon"/>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox"></input>Remember me</label>
                    <Link to  ="/forgot" className="custom-link" >Forgot password?</Link>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>   
    )   
}
export default LoginForm