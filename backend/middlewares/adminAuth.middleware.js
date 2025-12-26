import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";
import Admin from "../models/admin.model.js";

export const adminAuth = asyncHandler(async (req, res, next) => {   
  const token = req.cookies.adminToken;
  
  if (!token){
    throw new ApiError(400, "Authorization failed!! in admin");
  }
  const verifiedToken = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET);

  if (!verifiedToken) {
    throw new ApiError(400, "Login required!!");
  }

  const admin = await Admin.findById(verifiedToken._id).select("-password");
  if (!admin) {
    throw new ApiError(400, "Invalid access token");
  }

  req.admin = admin;
  next();
});
