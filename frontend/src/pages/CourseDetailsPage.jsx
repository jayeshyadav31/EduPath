import React, { useEffect ,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useCourseDetails from '../hooks/useCourseDetails'
import { useDispatch } from 'react-redux'
import { useAuthContext }  from '../context/AuthContext'
import { addCourse } from '../redux/courseSlice'
import toast from 'react-hot-toast'
function CourseDetailsPage() {
    const [course,setCourse]=useState()
    const {id}=useParams()
    const navigate=useNavigate()
    const temp=useCourseDetails({id,setCourse})
    const dispatch =useDispatch()
    const {authUser}=useAuthContext()
    const isPurchased = course && course.subscribers?.includes(authUser._id);
    console.log(isPurchased);
    const handleBuy=(e)=>{
        e.preventDefault();
        dispatch(addCourse(course));
        navigate('/buyCourse')
    }
  return (
    <div>
        <div className='flex rounded-md bg-blue-950 h-[300px] p-4 justify-between'>
            <div>
                <div className='ml-32'>
                    <h2 className='font-bold mt-3 text-blue-100' >{course?.category}</h2>
                    <h1 className='font-bold text-3xl text-white mt-2'>The {course?.title}</h1>
                    <h2 className='font-semibold text-white mt-6'>{course?.description}</h2>
                    <h3 className='font-semibold text-white mt-2'>{course?.subscribers?.length} enrolled students</h3>
                    <h3 className='font-semibold text-white mt-2'>Created By: {course?.instructor_name}</h3>
                    <div className='flex'>
                        <h3 className='font-semibold text-white mt-2'>Last updated at : {course?.updatedAt.substr(0,10)} </h3>
                        <h3  className='ml-8 font-semibold text-white mt-2'>Language: {course?.language}</h3>
                    </div>
                </div>            
            </div>
            <div className='mr-10 rounded-lg justify-center border-1 border-gray-500 bg-white w-[300px] '>
                <img src={course?.thumbnail} alt='course-image' className='rounded-lg w-[300px] h-[150px]'/>
                <h1 className='font-bold ml-6 mt-2'>₹ {course?.price}</h1>
                <button className='h-10 text-center w-[250px] ml-6 justify-center align-middle p-2  bg-sky-500 mt-2 rounded-md font-bold'
                onClick={() => isPurchased ? toast('Go to Dashboard') : handleBuy()}>{isPurchased?"Purchased":"Buy Course"}</button>
                <h2 className='font-bold ml-20 mt-2'>Full Lifetime Access</h2>           
            </div>
        </div>
        <div>
            <div className='ml-28 mt-6 rounded-lg border-2 p-4 w-[500px] border-gray-300'>
                <h1 className='text-gray-400 font-bold mb-1 text-xl'>What You will learn</h1>
                {course?.lectures?.map((lecture,index)=>{
                    return <h1 className='ml-2' key={index}>✓ {lecture?.title}</h1>
                })}
            </div>
        </div>
        <div className='ml-28 mt-6 rounded-lg border-2 p-4 w-[500px] border-gray-300'>
            <h1 className='font-bold text-xl text-gray-400'>This course includes :</h1>
            {course?.lectures?.map((lecture,index)=>(
                <div key={index} className='ml-2'>
                    <li className='font-semibold'>{course?.title}</li>
                    <h1 className='ml-2'>{course?.description}</h1>
                </div>
                ))}
            <li className='ml-2 font-semibold'>{course?.lectures?.length} Videos</li>
            <li className='ml-2 font-semibold'>Full Time Access</li>
            <li className='ml-2 font-semibold'>Access on Mobile and Tv</li>
        </div>
    </div>
  )
}

export default CourseDetailsPage