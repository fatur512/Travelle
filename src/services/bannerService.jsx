import axios from "axios";
import Cookies from "js-cookie";
import { API_KEY, API_URL } from "../config/env";

// ========== GET BANNERS (umum) ==========
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

// ========== GET BANNER BY ID (umum) ==========
export const fetchBannersById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/banners/${id}`, {
      headers: {
        apiKey: API_KEY,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("fetchBannersById failed:", error.response?.data || error.message);
    throw error;
  }
};

// Helper untuk header otorisasi admin
const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    apiKey: API_KEY,
    Authorization: `Bearer ${token}`,
  };
};

// ========== CREATE BANNER (admin) ==========
export const createBanner = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/create-banner`, data, {
      headers: getAuthHeaders(),
      "Content-Type": "application/json",
    });
    alert("Banner Berhasil Dibuat");
    return res.data;
  } catch (error) {
    console.error("createBanner failed:", error.response?.data || error.message);
    throw error;
  }
};

// ========== UPDATE BANNER (admin) ==========
export const updateBanner = async (id, data) => {
  try {
    const res = await axios.post(`${API_URL}/update-banner/${id}`, data, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (error) {
    console.error("updateBanner failed:", error.response?.data || error.message);
    throw error;
  }
};

// ========== DELETE BANNER (admin) ==========
export const deleteBanner = async (id) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.delete(`${API_URL}/delete-banner/${id}`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("deleteBanner failed:", error.response?.data || error.message);
    throw error;
  }
};
