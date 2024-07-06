import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import connectDB from './db/connectDB.js'
import userRoutes from './routes/userRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import { stripePayment,confirmation } from './controllers/stripeController.js'
dotenv.config()
connectDB()
const app=express()
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const port =process.env.PORT || 3000
app.use('/api/users',userRoutes)
app.use("/api/courses",courseRoutes)
app.use("/api/payment",paymentRoutes)
app.use('/api/stripe/checkout',stripePayment)
app.use('/api/stripe/confirmation',confirmation)
app.listen(port,()=>{
    console.log(`server is listening to the port :${port}`);
})
