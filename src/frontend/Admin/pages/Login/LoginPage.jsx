import React from "react";

import Login from "./Login";
import { useParams } from "react-router-dom";

const LoginPage = () => {
  const { idUser } = useParams(); // Lấy idUser từ URL
    return (
        <div className="App">
          <Login/>
        </div>
    );
};

export default LoginPage;
