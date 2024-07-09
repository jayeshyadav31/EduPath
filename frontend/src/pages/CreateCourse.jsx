import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

function CreateCourse() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor_name: '',
    price: '',
    category: '',
    language: '',
    pdfFileLink: '',
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [lectures, setLectures] = useState([{ title: '', description: '', videoFile: null }]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleLectureChange = (index, e) => {
    const { name, value } = e.target;
    const newLectures = [...lectures];
    newLectures[index][name] = value;
    setLectures(newLectures);
  };

  const handleLectureFileChange = (index, e) => {
    const file = e.target.files[0];
    const newLectures = [...lectures];
    newLectures[index].videoFile = file;
    setLectures(newLectures);
  };

  const handleAddLecture = () => {
    setLectures([...lectures, { title: '', description: '', videoFile: null }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.title || !formData.description || !formData.instructor_name || !formData.price || !thumbnail) {
      toast.error('Please fill in all the fields and upload a thumbnail');
      return;
    }

    // Prepare form data to send to backend
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('instructor_name', formData.instructor_name);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('language', formData.language);
    data.append('pdfFileLink', formData.pdfFileLink);
    data.append('thumbnail', thumbnail);

    lectures.forEach((lecture, index) => {
      data.append(`lectures[${index}][title]`, lecture.title);
      data.append(`lectures[${index}][description]`, lecture.description);
      if (lecture.videoFile) {
        data.append(`lectures[${index}][videoFile]`, lecture.videoFile);
      }
    });

    try {
      const response = await fetch('/api/courses/create-course', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to create course');
      }

      const result = await response.json();
      toast.success('Course created successfully');
      console.log('Course created successfully:', result);

      // Reset form fields
      setFormData({
        title: '',
        description: '',
        instructor_name: '',
        price: '',
        category: '',
        language: '',
        pdfFileLink: '',
      });
      setThumbnail(null);
      setLectures([{ title: '', description: '', videoFile: null }]);
    } catch (error) {
      console.error('Error creating course:', error);
      toast.error('Error creating course');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a New Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-500 rounded-md p-2 w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="instructor_name">Instructor Name:</label>
            <input
              type="text"
              id="instructor_name"
              name="instructor_name"
              value={formData.instructor_name}
              onChange={handleChange}
              className="border border-gray-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="thumbnail">Thumbnail:</label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              onChange={handleThumbnailChange}
              className="border border-gray-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="language">Language:</label>
            <input
              type="text"
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="border border-gray-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="pdfFileLink">PDF File Link:</label>
            <input
              type="text"
              id="pdfFileLink"
              name="pdfFileLink"
              value={formData.pdfFileLink}
              onChange={handleChange}
              className="border border-gray-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {lectures.map((lecture, index) => (
            <div key={index} className="mb-4 border-b pb-4">
              <h3 className="text-lg font-semibold mb-2">Lecture {index + 1}</h3>
              <div className="mb-2">
                <label className="block text-gray-700 font-semibold mb-1" htmlFor={`lectureTitle${index}`}>Title:</label>
                <input
                  type="text"
                  id={`lectureTitle${index}`}
                  name="title"
                  value={lecture.title}
                  onChange={(e) => handleLectureChange(index, e)}
                  className="border border-gray-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-semibold mb-1" htmlFor={`lectureDescription${index}`}>Description:</label>
                <textarea
                  id={`lectureDescription${index}`}
                  name="description"
                  value={lecture.description}
                  onChange={(e) => handleLectureChange(index, e)}
                  className="border border-gray-500 rounded-md p-2 w-full h-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-semibold mb-1" htmlFor={`lectureVideoFile${index}`}>Video File:</label>
                <input
                  type="file"
                  id={`lectureVideoFile${index}`}
                  name="videoFile"
                  onChange={(e) => handleLectureFileChange(index, e)}
                  className="border border-gray-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddLecture}
            className="text-blue-500 font-semibold py-2 px-4 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 mb-4"
          >
            Add Lecture
          </button>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
