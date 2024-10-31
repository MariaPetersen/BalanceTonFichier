import React from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            <i class="fa-solid fa-right-from-bracket"></i>
        </button>
    );
};

export default LogoutButton;
