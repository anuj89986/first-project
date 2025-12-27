import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import asyncHandler from 'express-async-handler'
import { ApiError } from '../utils/ApiError.js';

const verifyJWT = asyncHandler(async(req,res,next)=>{
    const token = req.cookies?.accessToken;
    
    if(!token){
        throw new ApiError(401, "User authentication required");
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(verifiedToken._id).select('-password');

        if(!user){
            throw new ApiError(401, "Invalid user access token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Invalid or expired user token");
    }
});

export default verifyJWT;