import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import PaymentCard from './PaymentCard'
import usePaymentsByUser from '../hooks/usePaymentsByUser';
function Payments() {
    const { authUser } = useAuthContext();
    const { payments, loading } = usePaymentsByUser()

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {payments.map((payment) => (
                <PaymentCard key={payment?._id} payment={payment} />
            ))}
        </div>
    );
}

export default Payments;
