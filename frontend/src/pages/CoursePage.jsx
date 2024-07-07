import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import useCourseDetails from '../hooks/useCourseDetails';
import LectureCard from '../components/LectureCard';

function CoursePage() {
  const [course, setCourse] = useState({});
  const { id } = useParams();
  const [currentlyOpen, setCurrentlyOpen] = useState(null);
  useCourseDetails({ id, setCourse });
  return (
    <div>
      <div className='ml-20'>
        <h1 className='font-bold text-gray-700 text-lg'>{course?.title}</h1>
        <h2 className='font-bold mt-2 text-gray-700 text-md font-serif'>By: {course?.instructor_name}</h2>
      </div>
      <div className='mt-8'>
        {course?.lectures?.length > 0 ? (
          <div>
            {course.lectures.map((lecture, index) => (
              <div key={index} className='lecture'>
                <LectureCard lecture={lecture} index={index} currentlyOpen={index===currentlyOpen?true:false} setCurrentlyOpen={setCurrentlyOpen}/>
              </div>
            ))}
          </div>
        ) : (
          <p>No lectures available</p>
        )}
      </div>
      <div className='flex mt-8 ml-8 p-12'>
        <h1 className='font-serif font-semibold'>You Can Access Notes here:</h1>
        <h1 className='ml-2 font-serif'>{course.pdfFileLink?course.pdfFileLink:"To be available soon 😊"}</h1>
      </div>
    </div>
  );
}

export default CoursePage;
