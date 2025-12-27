import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";
import Admin from "../models/admin.model.js";

export const adminAuth = asyncHandler(async (req, res, next) => {   
  const token = req.cookies?.adminToken;
  
  if (!token){
    throw new ApiError(401, "Admin authentication required");
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET);

    const admin = await Admin.findById(verifiedToken._id).select("-password");
    
    if (!admin) {
      throw new ApiError(401, "Invalid admin access token");
    }

    req.admin = admin;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired admin token");
  }
});
