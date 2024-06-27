import User from "../Models/userModel.js";
import ApiError from "../utils/ApiError.js";
import jwt from 'jsonwebtoken'
const verifyJwt=async(req,res,next)=>{
    try {
        // console.log(process.env.ACCESS_TOKEN_SECRET);
        const token=req.cookies.accessToken || req.header("authorization")?.replace("Bearer ","")
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        // console.log(decodedToken);
        const user=await User.findOne({_id:decodedToken._id}).select('-password')
        if (!user) {   
            throw new ApiError(401, "Invalid Access Token")
        }
        req.user = user;
        next()
    } catch (error) {
        console.log(`error in the verify jwt ${error.message}`);
        throw new ApiError(401, error?.message || "Invalid access token")
    }
}
export default verifyJwt