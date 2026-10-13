import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

import { prisma } from "./lib/db.js";
import authRouter from "./routes/auth.routes.js";
import resumeRouter from "./routes/resume.routes.js";




dotenv.config()
const app=express()

app.use(express.json())
app.use(cookieParser())
// cors configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
};
app.use(cors(corsOptions));
const PORT=process.env.PORT || 3000
app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/resume",resumeRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})