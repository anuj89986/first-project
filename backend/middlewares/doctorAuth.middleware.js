import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken'
import Doctor from "../models/doctor.model.js";

const verifyDoc = asyncHandler(async(req,res,next)=>{
    const token = req.cookies.doctorToken;
    if(!token){
        throw new ApiError(400,"Autorization failed!! in doc")
    }

    const verifiedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    const doctor = await Doctor.findById(verifiedToken._id).select('-password')

    if(!doctor){
        throw new ApiError(400,"Invalid access token")
    }

    req.doctor = doctor;

    next()

})
export default verifyDoc