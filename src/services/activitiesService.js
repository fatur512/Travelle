import axios from "axios";
import { API_KEY, API_URL } from "../config/env";

// GET activities
export const fetchActivites = async () => {
  try {
    const res = await axios.get(`${API_URL}/activities`, {
      headers: {
        apiKey: API_KEY,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("getActiivities failed", error.response?.data || error.message);
    throw error;
  }
};
