import { Router } from "express";
import { getUser, loginUser, logoutUser, signUpUser, updateProfilePic, updateUser } from "../controllers/userController.js";
import verifyJwt from "../middleware/authmiddleware.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.post('/logout',verifyJwt,logoutUser)
router.post('/update', verifyJwt, updateUser);
router.post('/update/profilePic', verifyJwt, upload.single('profilePic'), updateProfilePic);
router.get("/getUser/:id",verifyJwt,getUser)

export default router;
