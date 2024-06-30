import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Card from '../components/Card';
import Carousel from '../components/Carousel';

function HomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`/api/courses/getAllCourses`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
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
  }, [courses]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (courses?.length === 0) {
    return <div>No courses available</div>;
  }

  return (
    <div className='p-2'>
      <Carousel/>
      <div className='mt-2 ml-6'>
        <h1 className='font-bold text-3xl text-gray-600'>All the skills you need in one place</h1>
        <h2 className='text-gray-400 mt-1 text-xl'>From critical skills to technical topics, EduPath supports your professional development.</h2>
      </div>
    <div className='flex flex-wrap space-x-14 border-t-2 border-gray-400 mt-4'>
      {courses && courses?.map((course) => (
        <Card key={course._id} course={course} />
      ))}
    </div>
    </div>
  );
}

export default HomePage;
