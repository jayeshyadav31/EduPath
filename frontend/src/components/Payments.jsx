import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import PaymentCard from './PaymentCard';
import usePaymentsByUser from '../hooks/usePaymentsByUser';
import useFetchPayments from '../hooks/useFetchPayments';

function Payments() {
  const { authUser } = useAuthContext();
  console.log(authUser);
  const {
    payments: userPayments,
    loading: userLoading
  } = usePaymentsByUser();

  const {
    payments: allPayments,
    loading: allLoading
  } = useFetchPayments();
  console.log(authUser?.role=='admin');
  const payments = authUser?.role == 'admin' ? allPayments : userPayments;
  const loading = authUser?.role == 'admin' ? allLoading : userLoading;
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
