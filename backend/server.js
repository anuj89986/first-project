import express from "express";
import "dotenv/config";
import connectDB from "./configs/mongoDb.js";
import connectCloudinary from "./configs/cloudinary.js";
import cors from "cors";
import router from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import adminRouter from "./routes/admin.route.js";
import doctorRouter from "./routes/doctor.route.js";
import appRouter from "./routes/appointment.route.js";

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: ['http://localhost:5173','http://localhost:5174',"https://care-plus-user.netlify.app/","https://care-plus-staff.netlify.app/"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use(router);
app.use('/admin',adminRouter)
app.use('/doctor',doctorRouter)
app.use('/appointment',appRouter)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
