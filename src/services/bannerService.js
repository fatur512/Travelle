// src/services/bannerService.js
import axios from "axios";

const API_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1";
const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

// Global Axios Config
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Kirim cookie jika dibutuhkan untuk otentikasi
  headers: {
    apiKey: API_KEY,
  },
});

// GET banners
export const fetchBanners = async () => {
  try {
    const res = await axios.get(`${API_URL}/banners`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    console.error("fetchBanners failed:", error.response?.data || error.message);
    throw error;
  }
};

// CREATE banner
export const createBanner = async (data) => {
  const res = await axiosInstance.post("/create-banner", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// UPDATE banner
export const updateBanner = async (id, data) => {
  const res = await axiosInstance.post(`/update-banner/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// DELETE banner
export const deleteBanner = async (id) => {
  const res = await axiosInstance.delete(`/delete-banner/${id}`);
  return res.data;
};
