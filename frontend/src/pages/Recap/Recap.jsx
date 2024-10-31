import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Recap.css";
import useApi from "../../hooks/useApi";

export default function Recap() {
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const { fetchData, uploadFile } = useApi();

    const fetchFiles = useCallback(async () => {
        const response = await fetchData("/file/userFiles", "GET", {}, true);
        setFiles(response);
    }, []);

    const uploadNewFile = useCallback(
        async (file) => {
            uploadFile("/file/upload", file, true).then((response) => {
                fetchFiles();
            });
        },
        [files]
    );

    useEffect(() => {
        const fetch = async () => {
            await fetchFiles();
        };
        fetch();
    }, [fetchFiles]);

    const handleFileChange = async (event) => {
        const newFiles = Array.from(event.target.files);
        newFiles.forEach((file) => uploadNewFile(file));
    };

    const handleRemoveFile = async (fileId) => {
        fetchData(`/file/delete/${fileId}`, "DELETE", {}, true).then(
            (response) => {
                fetchFiles();
            }
        );
    };

    const handleGenerateLink = async () => {
        fetchData(`/shareLink/create`, "POST", {}, true).then((link) => {
            navigate(`/download/${link.id}`);
        });
    };

    const formatFileSize = (size) => {
        if (size >= 1024 * 1024) {
            return `${(size / 1024 / 1024).toFixed(2)} Mo`;
        } else if (size >= 1024) {
            return `${(size / 1024).toFixed(2)} Ko`;
        } else {
            return `${size} octets`;
        }
    };

    console.log(files);

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
                            <div className="wrap-file-name">
                                <span className="file-name">
                                    {file.user_file_name}
                                </span>
                                <span>{formatFileSize(file.file_size)}</span>
                            </div>
                            <button
                                className="remove-file-button"
                                onClick={() => handleRemoveFile(file.id)}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    className="generate-link-button"
                    onClick={handleGenerateLink}
                    disabled={files.length === 0}
                >
                    Générer un lien*
                </button>
                <p className="link-validity">
                    *Ce lien sera valable pendant 1 semaine
                </p>
            </div>
        </div>
    );
}
