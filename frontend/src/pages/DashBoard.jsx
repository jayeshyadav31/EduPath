import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import Card from '../components/Card';

function DashBoard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`/api/courses/getAllCourses`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
        } else {
          throw new Error('Failed to fetch courses');
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (courses.length > 0 && authUser) {
      const enrolledCourses = courses.filter(course =>
        course.subscribers?.includes(authUser._id)
      );
      setEnrolled(enrolledCourses);
    }
  }, [courses, authUser]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='mt-2'>
        <h1 className='font-bold text-gray-400 ml-4 text-lg'>Purchased Courses:</h1>
        <div className='flex flex-wrap space-x-14 border-t-2 border-gray-400 mt-4'>
      {enrolled.length > 0 ? (
        enrolled.map((course) => (
          <Card key={course._id} course={course} path={'/YourCourse'} />
        ))
      ) : (
        <p className='justify-center'>No courses enrolled</p>
      )}
    </div>
    </div>
    
  );
}

export default DashBoard;
