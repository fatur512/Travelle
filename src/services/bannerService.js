import axios from "axios";
import { API_KEY, API_URL } from "../config/env";

// GET banners
export const fetchBanners = async () => {
  try {
    const res = await axios.get(`${API_URL}/banners`, {
      headers: {
        apiKey: API_KEY,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("fetchBanners failed:", error.response?.data || error.message);
    throw error;
  }
};

// CREATE banner
export const createBanner = async (data) => {
  const res = await axios.post(`${API_URL}/create-banner`, data, {
    headers: {
      apiKey: API_KEY,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// UPDATE banner
export const updateBanner = async (id, data) => {
  const res = await axios.post(`${API_URL}/update-banner/${id}`, data, {
    headers: {
      apiKey: API_KEY,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// DELETE banner
export const deleteBanner = async (id) => {
  const res = await axios.delete(`${API_URL}/delete-banner/${id}`, {
    headers: {
      apiKey: API_KEY,
    },
  });
  return res.data;
};
