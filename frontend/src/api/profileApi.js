import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8002",
});

export const saveProfile = (data) =>
  API.post("/profile/onboarding", data);

export const getProfileStatus = () =>
  API.get("/profile/status");
