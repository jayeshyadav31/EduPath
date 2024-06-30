import React from 'react';
import LogoutButton from './LogoutButton';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';

function Header() {
    const navigate = useNavigate();
    const {authUser}=useAuthContext()

    return (
        <div className="rounded-lg p-4 mt-5 mb-10 w-full border-2 border-gray-400 justify-center text-center">
            <div className="flex justify-between text-center items-center">
                <a 
                    onClick={() => { navigate('/') }} 
                    className="text-md font-bold text-purple-700 font-fantasy p-2 cursor-pointer">
                    Edu Path
                </a>
                {authUser &&
                <div className="flex space-x-4 mr-5">
                    <a 
                        onClick={() => { navigate('/dashboard') }} 
                        className="text-black hover:text-purple-700 p-2 cursor-pointer"
                    >
                        Dashboard
                    </a>
                    <a 
                        onClick={() => { navigate('/account') }} 
                        className="text-black hover:text-purple-700  p-2 cursor-pointer"
                    >
                        My Account
                    </a>
                    <LogoutButton />
                </div>
                }
            </div>
        </div>
    );
}

export default Header;
