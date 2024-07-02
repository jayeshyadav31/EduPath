import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import useGetDetails from '../hooks/useGetDetails';
import UpdateUserProfile from '../components/UpdateUserProfile';

function Account() {
  const { authUser } = useAuthContext();
  const { loading, getDetails } = useGetDetails();
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);

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
    <div className="flex flex-col gap-4 w-[900px] justify-center ml-[450px]">
      {show && <UpdateUserProfile user={user} onClose={() => setShow(false)} />}
      <div className="flex bg-red-500 w-[500px] h-32 items-center rounded-lg p-2 overflow-hidden">
        {user?.profilePic ? (
          <img
            src={user?.profilePic}
            alt="Profile"
            className="rounded-full w-32 h-32"
          />
        ) : (
          <img
            alt="Profile"
            className="rounded-full"
            style={{ width: '48px', height: '48px' }}
          />
        )}
        <p className="text-xl text-white ml-8 mb-2">Hi, {user?.username || 'User'}</p>
      </div>

      <div className="bg-white rounded-lg p-4 mt-4 w-96">
        <div className="flex justify-start">
          <p className="text-xl text-gray-600 font-bold mb-2">Account Details:</p>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <p className="text-md text-gray-800">Email Address :</p>
            <p className="text-md text-gray-800 ml-2">{user?.email || ''}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <p className="text-md text-gray-800">Phone Number :</p>
            <p className="text-md text-gray-800 ml-2">{user?.phoneNumber || ''}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <p className="text-md text-gray-800">Age :</p>
            <p className="text-md text-gray-800 ml-2">{user?.age || ''}</p>
          </div>
        </div>
        <button
          className="btn btn-sm mt-6 bg-blue-400 hover:bg-gray-600 p-2 rounded-md"
          onClick={() => {
            setShow(true);
          }}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Account;
