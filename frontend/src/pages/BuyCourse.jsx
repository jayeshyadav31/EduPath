import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_TEST_KEY);

const BuyCourse = () => {
  const course = useSelector((state) => state.course.data);
  const [isProceeding, setIsProceeding] = useState(false);
  const [error, setError] = useState(null);
  const [dates, setDates] = useState({
    start: new Date(),
    end: new Date(),
  });
  const changer = (start, end) => {
    setDates({ start, end });
  };
  console.log(course._id);
  const booker = async (e) => {
    e.preventDefault();
    try {
      setIsProceeding(true);
      setError(null);

      // Fetch checkout session details from your server
      const res1 = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: course.title,
          amount: course.price,
          Id: course._id,
          dates: dates,
        }),
      });

      const session = await res1.json();

      if (!session.sessionId) {
        throw new Error("Failed to create session");
      }

      // Initialize the stripe object using the stripePromise
      const stripe = await stripePromise;

      // Redirect to the checkout session
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        console.error(result.error);
        setError("An error occurred during redirection.");
      }
    } catch (error) {
      console.error("Error during reservation:", error);
      setError("An unexpected error occurred.");
    } finally {
      setIsProceeding(false);
    }
  };

  return (
    <div className="font-bold ml-[400px] justify-center w-[400px]">
      <div className="font-bold justify-normal">
        <div className="mt-2 flex justify-between">
          <h2>Course Name:</h2>
          <h2>{course?.title}</h2>
        </div>
        <div className="mt-1 flex justify-between">
          <h2>Instructor:</h2>
          <h2>{course?.instructor_name}</h2>
        </div>
      </div>
      <div className="h-1 bg-slate-500"></div>
      <div className="mt-2 flex justify-between">
        <h2>Price:</h2>
        <h2>{course?.price}</h2>
      </div>
      <div className="mt-1 items-end">
        <button
          className="ml-[320px] p-2 justify-end bg-red-500 h-10 rounded-lg"
          onClick={booker}
          disabled={isProceeding}
        >
          {isProceeding ? "Processing..." : "Proceed"}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default BuyCourse;
