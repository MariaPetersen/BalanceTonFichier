// useApi.js
import { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8090";

export default function useApi() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async (
        endpoint,
        method = "GET",
        body = null,
        withAuthorization = false
    ) => {
        setLoading(true);
        try {
            const response = await axios({
                method,
                url: `${API_BASE_URL}${endpoint}`,
                data: body,
                headers: withAuthorization
                    ? {
                          Authorization: `Bearer ${localStorage.getItem(
                              "token"
                          )}`,
                      }
                    : undefined,
            });
            setData(response.data);
            setError(null);
            return response.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const uploadFile = async (endpoint, file, withAuthorization = false) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const headers = withAuthorization
                ? {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                      "Content-Type": "multipart/form-data",
                  }
                : { "Content-Type": "multipart/form-data" };

            const response = await axios({
                method: "POST",
                url: `${API_BASE_URL}${endpoint}`,
                data: formData,
                headers,
            });

            setData(response.data);
            setError(null);
            return response.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchUserFiles = async () => {
        try {
            const response = await fetchData("/userFiles", "GET", null, true);
            return response;
        } catch (err) {
            console.error("Erreur lors de la récupération des fichiers :", err);
            throw err;
        }
    };

    return { data, error, loading, fetchData, uploadFile, fetchUserFiles };
}
