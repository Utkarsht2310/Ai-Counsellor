import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_HOST ? `https://${import.meta.env.VITE_API_HOST}` : "http://localhost:8000");

// Dashboard
export const getDashboardData = async () => {
  const res = await axios.get(`${API_URL}/profile/dashboard`);
  return res.data;
};

// AI
export const sendChatMessage = async (message) => {
  const res = await axios.post(`${API_URL}/ai/chat`, { message });
  return res.data;
};

// Universities
export const getRecommendations = async () => {
  const res = await axios.get(`${API_URL}/universities/recommendations`);
  return res.data;
};

export const shortlistUniversity = async (uniId) => {
  const res = await axios.post(`${API_URL}/universities/shortlist`, { university_id: uniId });
  return res.data;
};

export const lockUniversity = async (uniId) => {
  const res = await axios.post(`${API_URL}/universities/lock`, { university_id: uniId });
  return res.data;
};
