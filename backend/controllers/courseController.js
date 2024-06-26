import Course from '../Models/courseModel.js'
import ApiError from '../utils/ApiError.js';
const createCourse = async (req, res) => {
    try {
        const { title, description,thumbnail, instructor_name, price, category, lectures } = req.body;
        console.log(req.files);
        res.status(201).json({ message: 'Course created successfully',lectures});
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error: error.message });
    }
};
const getAllCourses=async(req,res)=>{
    try {
            
    } catch (error) {
        
    }
}
const getCourseDetails=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
const subscribeToCourse=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
export {createCourse,getCourseDetails,getAllCourses,subscribeToCourse};