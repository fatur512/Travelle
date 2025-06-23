// ✅ Perbaikan typo dan stabilisasi service
import axios from "axios";
import { API_KEY, API_URL } from "../config/env";

export const fetchActivities = async () => {
  try {
    const res = await axios.get(`${API_URL}/activities`, {
      headers: { apiKey: API_KEY },
    });
    return res.data.data;
  } catch (error) {
    console.error("fetchActivities failed:", error.response?.data || error.message);
    throw error;
  }
};

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
