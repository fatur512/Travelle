// ✅ Perbaikan typo dan stabilisasi service
import axios from "axios";
import { API_KEY, API_URL } from "../config/env";
import { act } from "react";

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

// create activity admin
export const createActivity = async (activityData) => {
  try {
    const res = await axios.post(`${API_URL}/create-activity`, activityData, {
      headers: {
        apiKey: API_KEY,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("createActivity failed:", error.response?.data || error.message);
    throw error;
  }
};

// update activity admin
export const updateActivity = async (id, activityData) => {
  if (!id || id === "undefined") {
    throw new Error("Invalid activity ID");
  }
  try {
    const res = await axios.put(`${API_URL}/update-activity/${id}`, activityData, {
      headers: {
        apiKey: API_KEY,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("updateActivity failed:", error.response?.data || error.message);
    throw error;
  }
};

// delete acitiyity admin
export const deleteActivity = async (id) => {
  if (!id || id === "undefined") {
    throw new Error("Invalid activity ID");
  }
  try {
    const res = await axios.delete(`${API_URL}/delete-activity/${id}`, {
      headers: {
        apiKey: API_KEY,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("deleteActivity failed:", error.response?.data || error.message);
    throw error;
  }
};
