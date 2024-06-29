import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoFile: {
    type: String, // Assuming this stores a URL or a path to the video file.
  },
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructor_name: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required:true,
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
