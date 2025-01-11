import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OTPInput.css";

const OTPInput = () => {
    const [otp, setOtp] = useState(new Array(6).fill("")); // Tạo mảng 6 ký tự rỗng
    const navigate = useNavigate();

    const handleChange = (element, index) => {
        const value = element.value;
        if (value.match(/^[0-9]{0,1}$/)) { // Chỉ cho phép nhập số
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Tự động chuyển đến ô tiếp theo nếu nhập xong
            if (value && index < 5) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join(""); // Ghép các ký tự thành mã OTP

        const response = await fetch("http://localhost:8000/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ otp: enteredOtp }),
        });

        if (response.ok) {
            alert("OTP verified successfully!");
            navigate("/reset");
        } else {
            alert("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleVerifyOTP}>
                <h1>Verify OTP</h1>
                <p>Please enter the 6-digit OTP sent to your email.</p>
                <div className="otp-container">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength="1"
                            className="otp-input"
                            value={value}
                            onChange={(e) => handleChange(e.target, index)}
                            onFocus={(e) => e.target.select()} // Tự động chọn toàn bộ khi focus
                        />
                    ))}
                </div>
                <button type="submit" className="verify-btn">Verify OTP</button>
            </form>
        </div>
    );
};

export default OTPInput;
