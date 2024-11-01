import React, { useRef } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
export default function Home() {
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { uploadFile } = useApi();

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("Fichier sélectionné:", file.name, file);
            handleFileUpload(file);
        }
    };

    const handleFileUpload = async (file) => {
        try {
            await uploadFile("/file/upload", file, true);
            navigate("/recap");
        } catch (error) {
            console.error("Erreur lors de l'ajout d'un fichier :", error);
        }
    };

    return (
        <div className="homepage">
            <LogoutButton />
            <div className="wrap-content">
                <img src="/logo.svg" alt="logo" />
                <h1>Envoyez vos fichiers jusqu'à 2 Go</h1>
                <h4>Dépose ton bazar, on s'occupe du reste !</h4>

                <img
                    className="dropfile-logo"
                    src="/dropfile.jpg"
                    alt="dropfile button"
                    onClick={handleClick}
                    style={{ cursor: "pointer" }}
                />

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />

                <p className="arrow-info-dropfile">
                    <i className="fa-solid fa-arrow-up"></i>
                </p>
                <p className="info-dropfile">
                    Cliquez ici pour déposer vos fichiers
                </p>
                <div className="pitie">
                    <Link to="/recap">Voir mon bazar</Link>
                </div>
            </div>
        </div>
    );
}
