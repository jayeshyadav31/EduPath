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
  console.log(paymentInfo);
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
  }, []); 

  useEffect(() => {
    const createPayment = async () => {
      if (paymentInfo && courseId) {
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
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to save payment');
          }

          const data = await response.json();
          console.log('Payment saved successfully:', data);
        } catch (error) {
          console.error('Error in creating payment:', error);
          toast.error('Error in creating payment');
        }
      }
    };
    createPayment();
  }, []); 

  useEffect(() => {
    const subscribe = async () => {
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
  }, []);
  return (
    <div className="flex">
    <div className='p-4 ml-[350px] w-[750px] border-2 border-gray-400 rounded-md'>
      <div className="font-bold">
        <h1 className='text-xl text-gray-400 text-center mb-4'>Payment of Course is Successful!!</h1>
      </div>
      <div className='font-semibold'>
        <h2 className='text-gray-400 text-lg mb-2'>Payment Details</h2>
        {paymentInfo ? (
          <div>
            <div className='flex justify-between mb-2'>
              <p className='text-gray-600'>Payment ID:</p>
              <p>{paymentInfo.id}</p>
            </div>
            <div className='flex'>
                <p className='text-gray-600'>Amount: </p>
                <p>{paymentInfo.amount_total / 100} INR</p>
            </div>
            <div className='flex'>
                <p className='text-gray-600'>Status: </p>
                <p>{paymentInfo.status}</p>
            </div>
            
          </div>
        ) : (
          <p>Loading payment details...</p>
        )}
      </div>
    </div>
  </div>
  );
};

export default SuccessPaymentPage;
