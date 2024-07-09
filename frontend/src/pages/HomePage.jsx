import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import { CircularProgress } from '@mui/material';
function HomePage() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
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
          setFilteredCourses(data); // Set initial filtered courses to all courses
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
    const results = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(results);
  }, [searchTerm, courses]);

  if (loading) {
    return(
    <div className="flex justify-center items-center h-screen">
    <CircularProgress size={64} />
  </div>)
  }

  if (courses.length === 0) {
    return <div>No courses available</div>;
  }

  return (
    <div className='p-2'>
      <Carousel/>
      <div className='mt-2 ml-6'>
        <h1 className='font-bold text-3xl text-gray-600'>All the skills you need in one place</h1>
        <h2 className='text-gray-400 mt-1 text-xl'>From critical skills to technical topics, EduPath supports your professional development.</h2>
        <input
          type='text'
          placeholder='Search for courses...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='mt-4 p-2 border border-gray-400 rounded w-full max-w-lg'
        />
      </div>
      <div className='flex flex-wrap space-x-10 justify-start border-t-2 border-gray-400 mt-4'>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Card key={course._id} course={course} />
          ))
        ) : (
          <div>No courses found</div>
        )}
      </div>
    </div>
  );
}

export default HomePage;