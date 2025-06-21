import axios from "axios";
import React from "react";
import { API_KEY, API_URL } from "../config/env";

export const fetchCategories = async () => {
  try {
    const res = await axios.get(`${API_URL}/categories`, {
      headers: {
        apiKey: API_KEY,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("fetchCategories failed:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchCategoryById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/categories/${id}`, {
      headers: {
        apiKey: API_KEY,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("Failed to fetch category:", error.response?.data || error.message);
    throw error;
  }
};
