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

// GET activity by ID
export const fetchActivityById = async (id) => {
  if (!id || id === "undefined") {
    throw new Error("Invalid activity ID");
  }
  try {
    const res = await axios.get(`${API_URL}/activity/${id}`, {
      headers: {
        apiKey: API_KEY,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("getActivityById failed", error.response?.data || error.message);
    throw error;
  }
};
