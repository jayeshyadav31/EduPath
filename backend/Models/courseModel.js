import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  videoFile: {
    type: String, // Assuming this stores a URL or a path to the video file.
  },
}, {
  timestamps: true // If you want timestamps for individual lectures
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
  instructor_name: {
    type: String,
    // required: true
  },
  thumbnail: {
    type: String
  },
  price:{
    type:Number,
    default:0
  },
  lectures: [lectureSchema],
  category: {
    type: String
  },
  subscribers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
