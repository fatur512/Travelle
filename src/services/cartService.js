import axios from "axios";
import React from "react";
import { API_KEY, API_URL } from "../config/env";
import Cookies from "js-cookie";

// GET cart
export const fetchCarts = async () => {
  try {
    const token = Cookies.get("token");

    const res = await axios.get(`${API_URL}/carts`, {
      headers: {
        apiKey: API_KEY,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("fetch cart failed", error);
    throw error;
  }
};
