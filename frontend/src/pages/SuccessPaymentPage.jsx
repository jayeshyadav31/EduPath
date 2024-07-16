import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const SuccessPaymentPage = () => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkoutId = searchParams.get('checkout_id');
  const courseId = searchParams.get('hall_id');
  const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await fetch('/api/stripe/confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: checkoutId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch payment info');
        }

        const data = await response.json();
        setPaymentInfo(data);
      } catch (error) {
        console.error('Error fetching payment info:', error);
        toast.error('Error fetching payment info');
      }
    };

    fetchPaymentInfo();
  }, [checkoutId]);

  useEffect(() => {
    const createPayment = async () => {
      if (!paymentInfo) return;

      try {
        const response = await fetch(`/api/payment/savePayment/${courseId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            payment_id: paymentInfo.id,
            amount: paymentInfo.amount_total / 100,
            status: paymentInfo.status === 'complete' ? 'completed' : paymentInfo.status,
            user_id: authUser._id,
            course_id: courseId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 409) {
            toast.error('Payment already exists');
          } else {
            throw new Error('Failed to save payment');
          }
        }

        const data = await response.json();
        console.log('Payment saved successfully:', data);
      } catch (error) {
        console.error('Error in creating payment:', error);
        toast.error('Error in creating payment');
      }
    };

    createPayment();
  }, [paymentInfo, courseId, authUser]);

  useEffect(() => {
    const subscribe = async () => {
      if (!paymentInfo) return;

      try {
        await fetch(`/api/courses/subscribe/${courseId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // const data = await res.json();
        //console.log(data);
      } catch (error) {
        console.log('Error in subscribing to course ', error);
      }
    };

    subscribe();
  }, [paymentInfo, courseId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className='p-6 bg-white shadow-lg rounded-lg w-full max-w-lg'>
        <div className="font-bold text-2xl text-center text-gray-700 mb-4">
          Payment Successful!
        </div>
        <div className='font-semibold text-gray-700'>
          <h2 className='text-lg mb-4 text-center'>Payment Details</h2>
          {paymentInfo ? (
            <div className="space-y-4">
              <div className='flex justify-between items-center'>
                <p className='text-gray-600'>Payment ID:</p>
                <p className='text-gray-800 font-medium'>{paymentInfo.id}</p>
              </div>
              <div className='flex justify-between items-center'>
                <p className='text-gray-600'>Amount:</p>
                <p className='text-gray-800 font-medium'>{paymentInfo.amount_total / 100} INR</p>
              </div>
              <div className='flex justify-between items-center'>
                <p className='text-gray-600'>Status:</p>
                <p className={`font-medium ${paymentInfo.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
                  {paymentInfo.status}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading payment details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessPaymentPage;
