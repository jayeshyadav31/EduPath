import { Router } from "express";
import { createCourse } from "../controllers/courseController.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post('/create-course', upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'lectures[0][videoFile]', maxCount: 10 },
  { name: 'lectures[1][videoFile]', maxCount: 1 },
]), createCourse);

export default router;
