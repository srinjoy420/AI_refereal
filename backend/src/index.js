import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import { prisma } from "./lib/db.js";
import authRouter from "./routes/auth.routes.js";


dotenv.config()
const app=express()

app.use(express.json())
app.use(cookieParser())
const PORT=process.env.PORT || 3000
app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.use("/api/v1/auth",authRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})