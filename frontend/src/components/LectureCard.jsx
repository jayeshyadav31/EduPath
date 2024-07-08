import React, { useState, useEffect } from 'react';
import ReactHlsPlayer from 'react-hls-player';

function LectureCard({ lecture, index, currentlyOpen, setCurrentlyOpen }) {
  const [show, setShow] = useState(false);
  const [playing, setPlaying] = useState(false);
  console.log(lecture);
  useEffect(() => {
    setShow(currentlyOpen);
  }, [currentlyOpen]);

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
        <div className='p-6 border-2 border-t-0 border-gray-700 rounded-b-md w-6/12'>
          <p className='ml-2 font-serif text-gray-400'>{lecture?.description}</p>
          {lecture.videoFile ? (
            <ReactHlsPlayer
              src={lecture.videoFile}  // HLS URL of the video
              controls={true}
              autoPlay={false}
              width='100%'
              height='auto'
              className='mt-2 rounded-md'
              onClick={() => setPlaying(!playing)}
            />
          ) : (
            <p>No video available for this lecture.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default LectureCard;
