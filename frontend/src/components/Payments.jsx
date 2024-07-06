import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import PaymentCard from './PaymentCard';

function Payments() {
    const { authUser } = useAuthContext();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPaymentsByUser = async () => {
            try {
                const res = await fetch('/api/payment/getPaymentByUser', {
                    method: "GET",
                });
                if (!res.ok) {
                    throw new Error('Error fetching payments');
                }
                const data = await res.json();
                data.sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date));
                setPayments(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching payments:', error.message);
            }
        }
        fetchPaymentsByUser();
    }, []); 

    return (
        <div>
            {payments.map((payment) => (
                <PaymentCard key={payment?._id} payment={payment} />
            ))}
        </div>
    );
}

export default Payments;
