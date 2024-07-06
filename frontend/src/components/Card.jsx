import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function Card({course}) {
    // console.log(course._id);
    const navigate=useNavigate()
    return(
    <div className="w-72 h-68 ml-5 rounded-lg overflow-hidden shadow-lg mt-3 cursor-pointer border-2 border-gray-300 "
       onClick={()=>{navigate(`/${course._id}`)}} >
            <div className="w-full">
                <div className="w-full h-42 border-none">
                    <img src={course.thumbnail} alt="course" className="w-full h-36" />
                </div>
                <div className='ml-4 mt-2'>
                    <h2 className='font-bold'>{course.title}</h2>
                    <h6 className=' text-gray-400'>{course.instructor_name}</h6>
                </div>
                <div className='mt-6 ml-4' >
                    <h1 className='font-bold text-gray-600'>₹{course.price}</h1>
                </div>
            </div>
        </div>
)}

export default Card;