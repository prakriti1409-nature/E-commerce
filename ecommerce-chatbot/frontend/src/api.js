import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const sendChatMessage = async (message, username = "guest") => {
  return await axios.post(`${API_BASE}/chat/`, { message, username });
};

export const fetchChatLogs = async () => {
  return await axios.get(`${API_BASE}/chat/logs`);
};
