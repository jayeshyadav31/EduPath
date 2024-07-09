import { useState, useEffect } from 'react';

const useFetchAllPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllPayments = async () => {
      try {
        const res = await fetch('/api/payment/getAllPayments', {
          method: 'GET',
        });
        if (!res.ok) {
          throw new Error('Error fetching payments');
        }
        const data = await res.json();
        data.sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date));
        setPayments(data);
      } catch (error) {
        console.log('Error in fetching all payments:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getAllPayments();
  }, []);

  return { payments, loading, error };
};

export default useFetchAllPayments;
