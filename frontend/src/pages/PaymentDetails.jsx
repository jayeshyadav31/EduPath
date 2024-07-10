import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function PaymentDetails() {
  const { id } = useParams();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await fetch('/api/stripe/confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch payment info');
        }

        const data = await response.json();
        setPaymentInfo(data);
        toast.success('Payment info fetched successfully');
      } catch (error) {
        console.error('Error fetching payment info:', error);
        toast.error('Error fetching payment info');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentInfo();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button type="button" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md" disabled>
          Loading...
        </button>
      </div>
    );
  }

  if (!paymentInfo) {
    return <div>No payment details available</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Transaction ID:</label>
        <p className="text-gray-600">{paymentInfo.id}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Amount:</label>
        <p className="text-gray-600">{paymentInfo.amount_total / 100} {paymentInfo.currency.toUpperCase()}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Payment Status:</label>
        <p className={`text-gray-600 ${paymentInfo.payment_status === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
          {paymentInfo.payment_status.charAt(0).toUpperCase() + paymentInfo.payment_status.slice(1)}
        </p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Customer Name:</label>
        <p className="text-gray-600">{paymentInfo.customer_details.name}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Customer Email:</label>
        <p className="text-gray-600">{paymentInfo.customer_details.email}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Created At:</label>
        <p className="text-gray-600">{new Date(paymentInfo.created * 1000).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default PaymentDetails;
