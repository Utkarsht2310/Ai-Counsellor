    import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8002",
});

export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
