import { Router } from "express";
import {registerUser,loginUser,logoutUser,setDetails, allUser} from '../controllers/user.controller.js'
import verifyJWT from "../middlewares/userAuth.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { bookAppointment } from "../controllers/appointment.controller.js";


const router = Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post('/logout',verifyJWT,logoutUser)
router.get('/check-auth',verifyJWT,(req,res)=>{
    res.status(200).json(new ApiResponse(200, req.user,"user Authenticated"));
})
router.post('/my-profile',verifyJWT,setDetails)
router.post('/book',verifyJWT,bookAppointment)
router.get('/all-users',allUser)

export default router;