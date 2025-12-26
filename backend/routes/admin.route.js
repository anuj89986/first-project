import { Router } from "express";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { registerDoctor, removeDoctor } from "../controllers/doctor.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { changePassword, loginAdmin } from "../controllers/admin.controller.js";
import { logOut } from "../controllers/admin.controller.js";
import { cancelAppointment } from "../controllers/appointment.controller.js";

const adminRouter = Router();

adminRouter.route('/register-doctor').post(upload.single('image'),registerDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/change-password',adminAuth,changePassword)
adminRouter.post('/logout',adminAuth,logOut)
adminRouter.get('/check-auth',adminAuth,(req,res)=>{
    res.status(200).json(new ApiResponse(200, req.admin,"admin Authenticated"));
})
adminRouter.patch('/remove-doc/:docId',adminAuth,removeDoctor)
adminRouter.patch('/cancel-appointment/:appointmentId',adminAuth,cancelAppointment)


export default adminRouter