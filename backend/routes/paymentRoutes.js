import { Router } from "express";
import verifyJwt from "../middleware/authmiddleware.js";
import {savePayment, getAllPayments , getPaymentDetails , getAllPaymentsByUser} from "../controllers/paymentController.js"
const router = Router();

router.post('/savePayment/:id',verifyJwt, savePayment)
router.get('/getDetails/:id',verifyJwt,getPaymentDetails)
router.get('/getAllPayments',verifyJwt,getAllPayments)
router.get('/getPaymentByUser',verifyJwt, getAllPaymentsByUser)
export default router