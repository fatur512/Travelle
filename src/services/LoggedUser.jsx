import axios from "axios";
import React from "react";
import { API_KEY, API_URL } from "../config/env";
import Cookies from "js-cookie";

export const fetchLoggedUser = async () => {
  try {
    const token = Cookies.get("token");

    if (!token) throw new Error("No token found");

    const res = await axios.get(`${API_URL}/user`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("Gagal mengambil data user:", error?.response?.data || error.message);
    throw error;
  }
};
