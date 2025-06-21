// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchCarts } from "../services/cartService";

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

  const removeFromCart = (id) => {
    setCarts((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    setCarts((prevCarts) =>
      prevCarts.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item))
    );
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
        updateQuantity,
        loadCarts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
