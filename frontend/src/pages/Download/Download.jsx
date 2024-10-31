import React from "react";
import { useNavigate } from "react-router-dom";
import "./Download.css";

export default function Recap() {
    const navigate = useNavigate();

    const handleGenerateLink = () => {
        navigate("/download");
    };

    return (
        <div className="download-page">
            <img src="/logo.svg" alt="logo" />
            <div className="download-container">
                <div className="top-download">
                    <img src="/success.svg" alt="logo" />
                    <h4>
                        Votre lien est prêt. Copiez-le en un clic et partagez-le
                        à vos destinataires.
                    </h4>
                </div>
                <div>
                    <div className="resume-download">1 fichier importé</div>
                    <div className="resume-download">
                        <div className="download-link-section">
                            <div>Lien de téléchargement</div>
                            <a href="#">
                                https://liendetechargement.com/3298hahe92hdiqs2aoizyriueqhsdifhshio
                            </a>
                        </div>
                        <div>
                            <button>
                                <i class="fa-regular fa-copy"></i>
                            </button>
                        </div>
                    </div>
                    <button
                        className="generate-link-button other-button"
                        onClick={handleGenerateLink}
                    >
                        Créer un autre transfert
                    </button>
                </div>
            </div>
        </div>
    );
}
