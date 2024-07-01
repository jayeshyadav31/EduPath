import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UpdateUserProfile({ user, onClose }) {
  const navigate = useNavigate();
  const fileRef = useRef();
  const [inputs, setInputs] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: '',
    phoneNumber: user?.phoneNumber || '',
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(user?.profilePic || '');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImgUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userUpdateRes = await fetch('/api/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: inputs.username,
          password: inputs.password,
          phoneNumber: inputs.phoneNumber,
          email: inputs.email,
        }),
      });

      if (!userUpdateRes.ok) {
        throw new Error('Failed to update user profile');
      }

      if (profilePicFile) {
        const formData = new FormData();
        formData.append('profilePic', profilePicFile);

        const profilePicRes = await fetch('/api/users/update/profilePic', {
          method: 'POST',
          body: formData,
        });

        if (!profilePicRes.ok) {
          throw new Error('Failed to update profile picture');
        }
      }

      onClose();
      navigate('/account');
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <form onSubmit={handleSubmit} className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl leading-tight mb-4">User Profile Edit</h1>

        <div className="mb-6">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="mb-4 md:mb-0 md:mr-6">
              <img className="w-32 h-32 rounded-full object-cover" src={imgUrl || user?.profilePic} alt="User Avatar" />
            </div>
            <div className="w-full">
              <button
                type="button"
                onClick={() => fileRef.current.click()}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Change Avatar
              </button>
              <input
                type="file"
                hidden
                ref={fileRef}
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            UserName
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="John Doe"
            value={inputs.username}
            onChange={(e) =>
              setInputs({ ...inputs, username: e.target.value })
            }
            type="text"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="your-email@example.com"
            value={inputs.email}
            onChange={(e) =>
              setInputs({ ...inputs, email: e.target.value })
            }
            type="email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="password"
            value={inputs.password}
            onChange={(e) =>
              setInputs({ ...inputs, password: e.target.value })
            }
            type="password"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone No
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="phone number"
            value={inputs.phoneNumber}
            onChange={(e) =>
              setInputs({ ...inputs, phoneNumber: e.target.value })
            }
            type="tel"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserProfile;
