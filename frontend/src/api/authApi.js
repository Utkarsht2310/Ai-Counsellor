import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_HOST ? `https://${import.meta.env.VITE_API_HOST}` : "http://localhost:8000"),
});

export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
