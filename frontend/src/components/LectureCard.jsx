import React, { useState, useEffect } from 'react';

function LectureCard({ lecture, index, currentlyOpen, setCurrentlyOpen }) {
  const [show, setShow] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    if (currentlyOpen === true && lecture.videoFile) {
      setVideoSrc(lecture.videoFile);  // Set the video file URL
    } else {
      setVideoSrc('');
    }
  }, [currentlyOpen, index, lecture.videoFile]);

  const handleShow = () => {
    setShow(!show);
    setCurrentlyOpen(show ? null : index);
  };

  return (
    <div className='mt-2 ml-20'>
      <div className='flex justify-between border-2 border-gray-700 rounded-md p-3 w-6/12 cursor-pointer' onClick={handleShow}>
        <h1 className='font-serif font-bold text-gray-600 ml-2'>{lecture?.title}</h1>
        <h1>{currentlyOpen === true ? '🔼' : '🔽'}</h1>
      </div>
      {currentlyOpen === true && (
        <div className='p-3 border-2 border-t-0 border-gray-700 rounded-b-md w-6/12'>
          <p className='ml-2 font-serif text-gray-400'>{lecture?.description}</p>
          {videoSrc && (
            <video
              controls
              controlsList="nodownload"
              className='mt-4 w-full rounded-sm'
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
    </div>
  );
}

export default LectureCard;


