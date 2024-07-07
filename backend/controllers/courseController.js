
import mongoose from 'mongoose';
import Course from '../Models/courseModel.js'
import ApiError from '../utils/ApiError.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
const createCourse = async (req, res) => {
    try {
        const { title, description, instructor_name, price, category,language,pdfFileLink} = req.body;
        // console.log(req.files);
        const respo=await uploadOnCloudinary(req.files['thumbnail'][0].path)
        const thumbnail_url = respo.secure_url
    
        let lectures = req.body.lectures; 

        for (let i = 0; i < lectures.length; i++) {
            const filePath = req.files[`lectures[${i}][videoFile]`];
            if (filePath && filePath[0] && filePath[0].path) {
                const response=await uploadOnCloudinary(filePath[0].path)
                lectures[i]['videoFile'] = response.secure_url;
            }
        }

        const newCourse = new Course({
            title,
            description,
            instructor_name,
            price,
            language,
            category,
            thumbnail: thumbnail_url,
            lectures,
        });
      
        await newCourse.save();
        res.status(201).json({ message: 'Course created successfully',newCourse});
    } catch (error) {
        console.log({ message: 'Error creating course', error: error.message });
        new ApiError(500, `Error in signing up user: ${error.message}`);
    }
};
const getAllCourses=async(req,res)=>{
    try {
        const courses=await Course.find()
        return res.status(200).json(courses)
    } catch (error) {
        console.log(`error in finding courses ${error.message}`)
        throw new ApiError(500,"error in creating  getAllCourses")
    }
}
const getCourseDetails=async(req,res)=>{
    try {
        const courseId=req.params.id
        console.log(courseId);
        const course=await Course.findById(courseId)
        if(!course){
            return res.status(404).json("No course found with this courseId")
        }
        console.log("info fetched successfully")
        return res.status(200).json(course)
    } catch (error) {
        console.log(`error in getting courses details ${error.message}`)
        throw new ApiError(500,"error in getting course details")
    }
}
const subscribeToCourse = async (req, res) => {
    try {
      const courseId = req.params.id;
      const userId = req.user._id;
      const course = await Course.findById(courseId);
  
      if (!course) {
        return res.status(404).json(new ApiError(404, 'Course not found'));
      }
  
      if (course.subscribers.includes(userId)) {
        console.log('User is already subscribed to this course');
        return res.status(400).json('User is already subscribed to this course');
      }
  
      course.subscribers.push(userId);
  
      await course.save();

      console.log('Subscribed to course successfully');
      res.status(200).json(course );
    } catch (error) {
      console.error(`Error in subscribing to course: ${error.message}`);
      res.status(500).json(new ApiError(500, `Error in subscribing to course: ${error.message}`));
    }
  };
  const GetUsersDetailsSubscribedToCourse = async (req, res) => {
    try {
      const courseId = new mongoose.Types.ObjectId(req.params.id);
  
      const response = await Course.aggregate([
        {
          $match: {
            _id: courseId
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'subscribers',
            foreignField: '_id',
            as: 'subscriberDetails'
          }
        },
        {
          $project: {
            _id: 0,
            subscriberDetails: {
              _id: 1,
              username: 1,
              email: 1,
              profilePic: 1
            }
          }
        }
      ]);
  
      if (response.length === 0) {
        return res.status(404).json(new ApiError(404, 'Course not found or no subscribers'));
      }
  
      res.status(200).json({ subscribers: response[0].subscriberDetails });
    } catch (error) {
      console.error(`Error finding users subscribed to course: ${error.message}`);
      res.status(500).json(new ApiError(500, `Error finding users subscribed to course: ${error.message}`));
    }
  };
  
export {createCourse,getCourseDetails,getAllCourses,subscribeToCourse,GetUsersDetailsSubscribedToCourse};