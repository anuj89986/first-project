import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";
import Doctor from "../models/doctor.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../configs/cloudinary.js";

const registerDoctor = asyncHandler(async (req, res) => {
  const { name, email, password, gender, speciality, about } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Enter the required fields");
  }

  const existedDoctor = await Doctor.findOne({ email });
  if (existedDoctor) {
    throw new ApiError(400, "Doctor already existed");
  }

  const filePath = req?.file?.path;
  // if(!filePath){
  //     throw new ApiError(400,"error in geting image path")
  // }

  const uploadedImage = await uploadOnCloudinary(filePath);
  // if(!uploadedImage){
  //     throw new ApiError(400,"error in uploading on cloudinary")
  // }

  const doctor = await Doctor.create({
    name,
    email,
    password,
    gender,
    ...(uploadedImage && { image: uploadedImage.url }),
    speciality,
    about,
  });

  const createdDoctor = await Doctor.findById(doctor._id).select("-password");

  if (!createdDoctor) {
    throw new ApiError(400, "Something went wrong in creating Doctor");
  }

  res
    .status(200)
    .json(new ApiResponse(500, createdDoctor, "Doctor created Successfully"));
});

const loginDoctor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "All Fields are Required");
  }

  const doctor = await Doctor.findOne({ email });

  const isPasswordValid = await doctor.verifyPassword(password);
  if (!isPasswordValid) {
    throw new ApiError(500, "Enter Correct password");
  }

  const token = await doctor.generateAccessToken();
  const loggedInDoc = await Doctor.findById(doctor._id).select("-password");

  const option = {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  };

  res
    .status(200)
    .cookie("doctorToken", token, option)
    .json(new ApiResponse(200, loggedInDoc, "Logged in Succesfully"));
});

const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find().select("-password");

  res.status(200).json(new ApiResponse(200, doctors, "all-Doctors"));
});
const logoutDoctor = asyncHandler(async (req, res) => {
  const option = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("doctorToken", option)
    .json(new ApiResponse(200, "logout Successfully"));
});
const getDoctor = asyncHandler(async (req, res) => {
  const { _id } = req.doctor._id;

  if (!_id) {
    throw new ApiError(401, "Error in getting the id info!");
  }

  const reqDoc = await Doctor.findById(_id);
  if (!reqDoc) {
    throw new ApiError(401, "error in finding the doctor");
  }
  res
    .status(200)
    .json(new ApiResponse(201, reqDoc, "Info of Doctor got Successfuly"));
});

const updateInfo = asyncHandler(async (req, res) => {
  const { phone, name, experience, qualification, address, fees, about } =
    req.body;

  const { _id } = req.doctor;
  const reqDoc = await Doctor.findById(_id);
  if (!reqDoc) {
    throw new ApiError(401, "error in finding the doctor");
  }
  const filePath = req?.file?.path;
  // if(!filePath){
  //     throw new ApiError(400,"error in geting image path")
  // }

  const uploadedImage = await uploadOnCloudinary(filePath);
  // if(!uploadedImage){
  //     throw new ApiError(400,"error in uploading on cloudinary")
  // }

  
  await Doctor.findOneAndUpdate(
    { _id: reqDoc._id },
    {
      $set: {
        phone: phone,
        address: address,
        name:name,
        experience:experience,
        qualification:qualification,
        fees:fees,
        about:about,
        ...(uploadedImage && { image: uploadedImage.url }),
      },
    }
  );

  res
  .status(200)
  .json(new ApiResponse(201,{reqDoc},"Details Updated Succesfully"))

});
const removeDoctor = asyncHandler(async(req,res)=>{
  const {docId} = req.params

  if(!docId){
    throw new ApiError(400,"Doctor not Found")
  }

  const doc = await Doctor.findByIdAndDelete(docId)
  res
  .status(200)
  .json(new ApiResponse(200,{doc},"Doctor Deleted Succesfully"))
})

export {
  registerDoctor,
  getAllDoctors,
  loginDoctor,
  logoutDoctor,
  getDoctor,
  updateInfo,
  removeDoctor
};
