import { useState, useEffect } from 'react';

const usePaymentsByUser = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPaymentsByUser = async () => {
            try {
                const res = await fetch('/api/payment/getPaymentByUser', {
                    method: 'GET',
                });
                if (!res.ok) {
                    throw new Error('Error fetching payments');
                }
                const data = await res.json();
                data.sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date));
                setPayments(data);
            } catch (error) {
                console.error('Error fetching payments:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentsByUser();
    }, []);

    return { payments, loading };
};

export default usePaymentsByUser;
