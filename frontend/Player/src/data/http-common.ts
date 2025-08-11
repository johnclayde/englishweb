// src/services/http-common.ts
import axios from "axios";

const apiClient = axios.create({
baseURL: "http://127.0.0.1:8000", // Replace with your API URL
headers: {
    "Content-Type": "application/json"
 },
  withCredentials: true,  
});

export default apiClient;
