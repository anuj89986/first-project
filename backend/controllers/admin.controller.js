import Admin from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const generateAdminAccessToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.ADMIN_ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (!admin) {
    throw new ApiError(400, "Admin not found");
  }

  const isPasswordCorrect = admin.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid Password");
  }

  const token = generateAdminAccessToken(admin._id);

  const option = {
    httpOnly: true,
    secure: true,
    sameSite : 'none'
  };

  res
    .status(200)
    .cookie("adminToken", token, option)
    .json(new ApiResponse(200, { admin }, "Admin logged in successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { _id } = req.admin._id;

  const admin = await Admin.findById(_id);
  if (!admin) {
    throw new ApiError(400, "Admin not found");
  }

  const isOldPasswordCorrect = admin.isPasswordCorrect(oldPassword);
  if (!isOldPasswordCorrect) {
    throw new ApiError(400, "Invalid old Password");
  }

  admin.password = newPassword;
  await admin.save();

  ApiResponse.success(res, "Password changed successfully");
});

const logOut = asyncHandler(async (req, res, next) => {
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  };

  res
    .status(200)
    .clearCookie("adminToken", options)
    .json(new ApiResponse(201, {}, "Logout Successfully"));
});

export { loginAdmin, changePassword, logOut };
