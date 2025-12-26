import { Router } from "express";
import verifyJWT from "../middlewares/userAuth.middleware.js";
import verifyDoc from "../middlewares/doctorAuth.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { allAppointment, bookAppointment, cancelAppointment, changeBookingStatus, changeStatus, payment, report } from "../controllers/appointment.controller.js";

const appRouter = Router();

appRouter.post('/payment',verifyJWT,payment)
appRouter.get('/all-appointments',allAppointment)
appRouter.post('/:docId',verifyJWT,bookAppointment)
appRouter.patch('/:appointmentId',verifyJWT,cancelAppointment)
appRouter.post('/change-book-status/:appointmentId',changeBookingStatus)
appRouter.post("/changeStatus/:appointmentId",verifyDoc,changeStatus)
appRouter.post('/save-report/:appointmentId',verifyDoc,report)
export default appRouter;