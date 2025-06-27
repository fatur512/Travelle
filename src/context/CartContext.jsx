// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchCarts,
  deleteCart,
  updateCartQuantity, // ✅ Import API service
} from "../services/cartService";
import Cookies from "js-cookie";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCarts = async () => {
    setLoading(true);
    try {
      const data = await fetchCarts();
      setCarts(data);
    } catch (err) {
      console.error("Failed to fetch carts:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    setCarts((prev) => [...prev, item]);
  };

  const updateQuantity = async (id, newQuantity) => {
    console.log("⚙️ updateQuantity called", { id, newQuantity });
    try {
      const safeQuantity = Math.max(1, newQuantity);
      await updateCartQuantity(id, safeQuantity); // call yang sudah diperbaiki
      await loadCarts();
    } catch (err) {
      console.error("❌ updateQuantity gagal:", err);
      alert("Gagal memperbarui jumlah item.");
    }
  };

  const decreaseQuantity = async (id) => {
    const item = carts.find((c) => c.id === id);
    const currentQty = item?.quantity || 1;
    if (currentQty <= 1) return;

    try {
      await updateCartQuantity(id, currentQty - 1); // ✅ Update ke backend
      await loadCarts();
    } catch (err) {
      console.error("Gagal mengurangi quantity:", err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const token = Cookies.get("token");
      await deleteCart(id, token);
      await loadCarts(); // Sync ulang data dari server
    } catch (error) {
      console.error("Gagal menghapus cart dari server:", error);
    }
  };

  const toggleItemCheck = (id) => {
    setCarts((prevCarts) => prevCarts.map((item) => (item.id === id ? { ...item, isChecked: !item.isChecked } : item)));
  };

  const toggleAllItemsCheck = (checked) => {
    setCarts((prevCarts) => prevCarts.map((item) => ({ ...item, isChecked: checked })));
  };

  useEffect(() => {
    loadCarts(); // saat mount
  }, []);

  return (
    <CartContext.Provider
      value={{
        carts,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity, // untuk tombol `+`
        decreaseQuantity, // untuk tombol `-`
        loadCarts,
        toggleItemCheck,
        toggleAllItemsCheck,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
