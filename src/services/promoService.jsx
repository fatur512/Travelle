import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { API_URL, API_KEY } from "../config/env";
// GET promos (user)
export const fetchPromos = async () => {
  try {
    const res = await axios.get(`${API_URL}/promos`, {
      headers: {
        apiKey: API_KEY,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("fetchPromos failed", error.response?.data || error.message);
    throw error;
  }
};

// POST create promo (admin)
export const createPromo = async (promoData) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.post(`${API_URL}/create-promo`, promoData, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("createPromo failed", error.response?.data || error.message);
    throw error;
  }
};

// Update promo (admin)
export const updatePromo = async (promoId, promoData) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.post(`${API_URL}/update-promo/${promoId}`, promoData, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    alert("Promo updated successfully");
    return res.data.data;
  } catch (error) {
    console.error("updatePromo failed", error.response?.data || error.message);
    throw error;
  }
};

// Delete promo (admin)
export const deletePromo = async (promoId) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.delete(`${API_URL}/delete-promo/${promoId}`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("deletePromo failed", error.response?.data || error.message);
    throw error;
  }
};
