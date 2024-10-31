import { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8090";

export default function useApi(endpoint, method = "GET", body = null) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (endpoint, method = "GET", body = null) => {
    setLoading(true);
    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}${endpoint}`,
        data: body,
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

  return { data, error, loading, fetchData };
}
