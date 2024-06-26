import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import connectDB from './db/connectDB.js'
import userRoutes from './routes/userRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
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
app.listen(port,()=>{
    console.log(`server is listening to the port :${port}`);
})
