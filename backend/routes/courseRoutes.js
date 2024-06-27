import { Router } from "express";
import { GetUsersDetailsSubscribedToCourse, createCourse, getAllCourses, getCourseDetails, subscribeToCourse } from "../controllers/courseController.js";
import upload from "../middleware/multer.js";
import verifyJwt from "../middleware/authmiddleware.js";

const router = Router();

router.post('/create-course', verifyJwt,upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'lectures[0][videoFile]', maxCount: 1 },
  { name: 'lectures[1][videoFile]', maxCount: 1 },
  { name: 'lectures[2][videoFile]', maxCount: 1 },
  { name: 'lectures[3][videoFile]', maxCount: 1 },
  { name: 'lectures[4][videoFile]', maxCount: 1 },
]), createCourse);
router.get('/getAllCourses',getAllCourses)
router.get('/:id',verifyJwt,getCourseDetails)
router.post('/subscribe/:id',verifyJwt,subscribeToCourse)
router.get('/getUsersDetails/:id',verifyJwt,GetUsersDetailsSubscribedToCourse)
export default router;
