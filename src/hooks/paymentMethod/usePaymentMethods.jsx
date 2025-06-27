import { useEffect, useState } from "react";
import { fetchPaymentMethods } from "../../services/paymentMethodService";

export default function usePaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPaymentMethods = async () => {
    setLoading(true);
    try {
      const data = await fetchPaymentMethods();
      setPaymentMethods(data);
    } catch (error) {
      setError("Failed to load payment methods");
      console.error("Error loading payment methods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPaymentMethods();
  }, []);
  return {
    paymentMethods,
    loading,
    error,
    reloadPaymentMethods: loadPaymentMethods, // Function to reload payment methods
  };
}
