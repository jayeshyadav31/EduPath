import mongoose from "mongoose";
const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URL,{
            serverSelectionTimeoutMS:5000,
        })
        console.log(`database connected ${conn.connection.host}`)
    } catch (error) {
        console.log(`error in connecting database: ${error.message}`);
        process.exit(1)
    }
}
export default connectDB;