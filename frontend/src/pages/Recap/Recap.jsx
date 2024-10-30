import React, { useState } from "react";
import "./Recap.css";

export default function Recap() {
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleRemoveFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const formatFileSize = (size) => {
        return `${(size / 1024).toFixed(2)} ko`;
    };

    return (
        <div className="recap-page">
            <img src="/logo.svg" alt="logo" />
            <div className="file-upload-container">
                <h2>1. Mes chargements</h2>
                <label className="file-dropzone">
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                    <span>+ Ajouter plus de fichiers</span>
                </label>
                <div className="file-list">
                    {files.map((file, index) => (
                        <div className="file-item" key={index}>
                            <span>{file.name}</span>
                            <span>{formatFileSize(file.size)}</span>
                            <button
                                className="remove-file-button"
                                onClick={() => handleRemoveFile(index)}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <button className="generate-link-button">
                    Générer un lien*
                </button>
                <p className="link-validity">
                    *Ce lien sera valable pendant 1 semaine
                </p>
            </div>
        </div>
    );
}
