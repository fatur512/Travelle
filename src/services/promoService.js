import axios from "axios";
import React from "react";

const API_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1";
const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

// GET promos
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
