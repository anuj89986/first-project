import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import "dotenv/config";

const generateAccessToken = async (id) => {
  try {
    const user = await User.findById(id);
    const accessToken = user.generateAccessToken();
    return accessToken;
  } catch (error) {
    throw new ApiError(500, "error in generating token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password ");

  if (!createdUser) {
    throw new ApiError(500, "Unable to create user");
  }
  const token = await generateAccessToken(user._id);

  const option = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(201)
    .cookie("accessToken", token, option)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "All Fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isPasswordValid = await user.checkPassword(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Enter correct password");
  }

  const token = await generateAccessToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password");

  const option = {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  };

  res
    .status(200)
    .cookie("accessToken", token, option)
    .json(new ApiResponse(200, loggedInUser, "Logged in successfully"));
});

const logoutUser = (req, res) => {
  const option = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(201)
    .clearCookie("accessToken", option)
    .json(new ApiResponse(200, {}, "Logout Successfully!!"));
};

const setDetails = asyncHandler(async (req, res) => {
  const { phone, address, gender, dob } = req.body;

  const user = await User.findById(req.user._id);

  if(!user){
    throw new ApiError(400,"There is an error finding user")
  }

  await User.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        phone: phone,
        address: address,
        gender: gender,
        dob: dob,
      },
    }
  );

  res.status(200).json(new ApiResponse(200, { user }, "updated Successfully"));
});
const allUser = asyncHandler(async(req,res)=>{
  const users = await User.find().select('-password');
  res.status(200).json(new ApiResponse(200,users,"All users fetched successfully"))
});

export { registerUser, loginUser, logoutUser,setDetails, allUser };