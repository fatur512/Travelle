import axios from "axios";
import React from "react";
import { API_KEY, API_URL } from "../config/env";
import Cookies from "js-cookie";

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
    const res = await axios.get(`${API_URL}/category/${id}`, {
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

// create category  (admin)
export const createCategory = async (categoryData) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.post(`${API_URL}/create-category`, categoryData, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("Failed to create category:", error.response?.data || error.message);
    throw error;
  }
};

// update category (admin)
export const updateCategory = async (id, categoryData) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.post(`${API_URL}/update-category/${id}`, categoryData, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
    });
    alert("Kategori berhasil diupdate");
    return res.data.data;
  } catch (error) {
    console.error("Failed to update category:", error.response?.data || error.message);
    throw error;
  }
};

// delete category (admin)
export const deleteCategory = async (id) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.delete(`${API_URL}/delete-category/${id}`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
    });
    alert("Kategori berhasil dihapus");
    return res.data.data;
  } catch (error) {
    console.error("Failed to delete category:", error.response?.data || error.message);
    throw error;
  }
};
