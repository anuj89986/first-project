import { Router } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getAllDoctors, getDoctor, loginDoctor, logoutDoctor, registerDoctor, updateInfo } from "../controllers/doctor.controller.js";
import verifyDoc from "../middlewares/doctorAuth.middleware.js";
import { changeStatus } from "../controllers/appointment.controller.js";
import upload from "../middlewares/multer.middleware.js";

const doctorRouter = Router()

doctorRouter.get("/all-doctors",getAllDoctors)
doctorRouter.post("/login",loginDoctor)
doctorRouter.post('/logout',logoutDoctor)
doctorRouter.get('/check-auth',verifyDoc,(req,res)=>{
    res.status(200).json(new ApiResponse(200, req.doctor,"user Authenticated"));
})
doctorRouter.get('/doc-info',verifyDoc,getDoctor)
doctorRouter.route('/update-doc').post(verifyDoc, upload.single('image'), updateInfo)
// doctorRouter.post("/changeStatus/:appointmentId",verifyDoc,changeStatus)

export default doctorRouter