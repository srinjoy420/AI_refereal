import jwt from "jsonwebtoken"
import { prisma } from "../lib/db.js"
import dotenv from "dotenv"
dotenv.config()

export const isLOggedIn=async(req,resizeBy,next)=>{
    try {
        const token=req.cookies.jwt
        if(!token){
            return res.status(401).json({message:"user not authenticate"})

        }
        let decoded
        try {
             decoded=await jwt.verify(token,process.env.TOKEN_SECRET)

        } catch (error) {
            console.log("middleware failour",error);
            
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }
        const user=await prisma.user.findUnique({
            where:{id:decoded.id},
            select:{
                id:true,
                name:true,
                email:true
            }
        })
        if(!user){
             return res.status(404).json({ message: "User not found" });
        }
        req.user=user
        next()
    } catch (error) {
        console.error("Error in authenticate middleware:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
    }
}