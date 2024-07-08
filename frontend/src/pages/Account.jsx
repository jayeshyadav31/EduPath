import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import useGetDetails from '../hooks/useGetDetails';
import UpdateUserProfile from '../components/UpdateUserProfile';
import Payments from '../components/Payments';
import { GrContact } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

function Account() {
  const { authUser } = useAuthContext();
  const { loading, getDetails } = useGetDetails();
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserDetails() {
      if (authUser) {
        const data = await getDetails({ userId: authUser._id });
        setUser(data);
      }
    }

    fetchUserDetails();
  }, [authUser]);

  return (
    <div className="flex flex-col items-center  min-h-screen py-6 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl">
        <div className="flex items-center justify-between bg-red-500 p-4">
          <div className="flex items-center">
            <div className="relative">
            <img
                src={user?.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div
                className="absolute bottom-0 right-0 rounded-full bg-green-500 text-white p-1 cursor-pointer"
                onClick={() => setShow(true)}
              >
                <svg
                  className="w-6 h-6 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v.01M12 12v.01M12 5v.01M12 12v.01M5 15h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-white">
                Hi, {user?.username || 'User'}
              </h1>
              <p className="text-sm text-white">{user?.email || ''}</p>
            </div>
          </div>
        </div>

        <div className="bg-white px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Account Details</h2>
            <button
              className="btn btn-sm bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={() => setShow(true)}
            >
              Edit Profile
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <p className="text-gray-600 font-medium">Email Address:</p>
              <p className="ml-2">{user?.email || ''}</p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-600 font-medium">Phone Number:</p>
              <p className="ml-2">{user?.phoneNumber || ''}</p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-600 font-medium">Age:</p>
              <p className="ml-2">{user?.age || ''}</p>
            </div>
          </div>
        </div>
      </div>

      {authUser.role === 'admin' ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl mt-6">
          <div className="bg-gray-200 px-4 py-2">
            <h2 className="text-lg font-semibold text-gray-800">All Payments By Users</h2>
          </div>
          <div className="border-t border-gray-300">
            <Payments />
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl mt-6">
          <div className="bg-gray-200 px-4 py-2">
            <h2 className="text-lg font-semibold text-gray-800">Your Payments</h2>
          </div>
          <div className="border-t border-gray-300">
            <Payments />
          </div>
        </div>
      )}
      <div
        className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full p-4 shadow-lg cursor-pointer"
        onClick={() => navigate('/contact')}
      >
        <GrContact size={'32px'} />
      </div>
      {show && <UpdateUserProfile user={user} onClose={() => setShow(false)} />}
    </div>
  );
}

export default Account;
