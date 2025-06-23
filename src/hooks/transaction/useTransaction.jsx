import { useEffect, useState } from "react";
import { fetchTransactions } from "../../services/transactionService";

const useTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError(err.message || "Gagal memuat transaksi");
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  return { transactions, loading, error };
};

export default useTransaction;
