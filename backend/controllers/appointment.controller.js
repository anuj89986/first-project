import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import stripe from "../configs/stripe.js";

const bookAppointment = asyncHandler(async (req, res) => {
  const { date, time } = req.body;
  const {docId} = req.params

  const user = await User.findById(req.user._id);

  const app = await Appointment.findOne({
    doctor : docId,
    date:date,
    time:time
  })
  if(app){
    throw new ApiError(400,"Slot is Already Booked")
  }

  const createdAppointment = await Appointment.create({
    doctor : docId,
    user: user._id,
    date,
    time
  });

  if (!createdAppointment) {
    throw new ApiError(400, "Error in creating appointment");
  }

    res.status(200).json(new ApiResponse(200,createdAppointment,"Appointment created succesfully"))
});

const cancelAppointment = asyncHandler(async(req,res)=>{
  const {appointmentId} = req.params

  const appointment = await Appointment.findByIdAndDelete(appointmentId)

  if(!appointment){
    throw new ApiError(400,"Appointment not found")
  }

  res.status(200).json(new ApiResponse(200,{},"Deleted succesfully"))
})

const allAppointment = asyncHandler(async(req,res)=>{

  const appointments = await Appointment.find()
  if(!appointments){
    throw new ApiError(400,"Error in Loading appointments or Empty")
  }

  const populatedAppointment = await Appointment.find().populate("doctor","name image address speciality fees").populate("user","username email phone dob address gender")

  res.status(200).json(new ApiResponse (200,populatedAppointment,"Found all Appointments"))

})
const changeStatus = asyncHandler(async (req,res)=>{
  const {appointmentId} = req.params;
  const app = await Appointment.findById(appointmentId);
  if(!app){
    throw new ApiError(400,"Error occurred while geting Appointment Data")
  }

  app.changeStatus()

  res.status(200).json(new ApiResponse (200,{},"Status Changed successfully"))
})
const report = asyncHandler(async(req,res)=>{
  const {weight,temperature,remark,medicine} = req.body
  if(!weight || !temperature || !remark || !medicine){
    throw new ApiError(401,"Data of Report is not Received")
  }

  const {appointmentId} = req.params

  const app = await Appointment.findById(appointmentId)

  if(!app){
    throw new ApiError(401,"Appointment not found")
  }

  app.weight = weight
  app.temperature = temperature;
  app.remark = remark
  app.medicine = medicine
  await app.save()

  res
  .status(200)
  .json(new ApiResponse(200,app,"report saved Succesfully"))
})

const payment = asyncHandler(async(req,res)=>{
  try {
    const {fees} = req.body

    const paymentIntent = await stripe.paymentIntents.create({
      amount: fees * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    })

    res.status(200).json(
      new ApiResponse(200, { clientSecret: paymentIntent.client_secret }, "Payment intent created")
    )
  } catch (error) {
    console.error("Stripe Error:", error);
    throw new ApiError(500,"error in creating Payment intent")
  }
})

const changeBookingStatus = asyncHandler(async(req,res)=>{
  const {appointmentId} = req.params

  const app = await Appointment.findByIdAndUpdate(appointmentId,{bookingStatus : true});
  if(!app){
    throw new ApiError(400,"error in getting the appointment info")
  }

  res
  .status(201)
  .json(new ApiResponse(201,{app},"updated Succesfully"))
})

export {bookAppointment,cancelAppointment,allAppointment,changeStatus,report,payment,changeBookingStatus}
