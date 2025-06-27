// src/hooks/transaction/useTransaction.js
import { useEffect, useState } from "react";
import { fetchTransactions } from "../../services/transactionService";

const useTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTransactions();
      setTransactions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    getData().then(() => {
      if (!isMounted) return;
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    transactions,
    loading,
    error,
    refreshTransactions: getData, // bisa dipanggil ulang kalau perlu
  };
};

export default useTransaction;
