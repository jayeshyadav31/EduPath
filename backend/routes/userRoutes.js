import { Router } from "express";
import { loginUser, signUpUser } from "../controllers/userController.js";
const router=Router()
router.post('/signup',signUpUser)
router.post('/login',loginUser)
export default router