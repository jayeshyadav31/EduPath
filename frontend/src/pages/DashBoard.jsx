import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import Card from '../components/Card';
import { CircularProgress } from '@mui/material';

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
        toast.error('Error fetching courses. Please try again later.');
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
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress size={64} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Purchased Courses</h1>
      {enrolled.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {enrolled.map((course) => (
            <Card key={course._id} course={course} path="/YourCourse" />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <p className="text-lg text-gray-600">No courses enrolled.</p>
        </div>
      )}
    </div>
  );
}

export default DashBoard;
