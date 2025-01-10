import React, { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSendOTP = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            alert("OTP has been sent to your email.");
            // Chuyển hướng đến trang OTPInput
            window.location.href = "/forgot/otp";
        } else {
            alert("Failed to send OTP. Please check your email and try again.");
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSendOTP}>
                <h1>Forgot Password</h1>
                <p>Enter your email to receive a reset OTP.</p>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send OTP</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
