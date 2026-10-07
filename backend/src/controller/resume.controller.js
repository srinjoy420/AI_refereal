import { prisma } from "../lib/db.js";
import streamifier from "streamifier";

import dotenv from "dotenv";
import cloudinary from "../config/cloudinary.config.js";


const uploadCloudenary = (fileBuffer, folder = 'resumes') => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "auto"
            },
            (error, result) => {
                if (error) return reject(error)
                resolve(result)
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream)
    })
}

export const uploadResume = async (req, res) => {
    try {
        const userId = req.user.id
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });

        }

        const uploadResult = await uploadCloudenary(req.file.buffer)
        const resume = await prisma.resume.create({
            data: {
                fileUrl: uploadResult.secure_url,
                fileName: req.file.originalname,
                userId
            }
        })
        res.status(201).json({ message: "Resume uploaded successfully", resume });
    } catch (error) {
        console.error("ERROR NAME:", error.name);
        console.error("ERROR MESSAGE:", error.message);
        console.error("ERROR STACK:", error.stack);
        res.status(500).json({ message: "Failed to upload resume" });

    }
}
export const getResume = async (req, res) => {
    try {
        const userId = req.user.id
        if (!userId) {
            return res.status(400).json({ message: "" })
        }
        const resume = await prisma.resume.findUnique({
            where: {
                userId
            }
        })
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" })
        }
        res.status(200).json({ message: "Resume fetched successfully", resume })
    } catch (error) {
        console.error("ERROR NAME:", error.name);
        console.error("ERROR MESSAGE:", error.message);
        console.error("ERROR STACK:", error.stack);
        res.status(500).json({ message: "Failed to fetch resume" });
    }
}

export const replaceResume = async (req, res) => {
    try {
        const userId = req.user.id
        if (!userId) {
            return res.status(404).json({ message: "your are not authenticated first login" })
        }
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });

        }
        const uploadResult = await uploadCloudenary(req.file.buffer)
        const resume=await prisma.resume.upsert({
            where:{userId},
            update:{
                fileUrl:uploadResult.secure_url,
                fileName:req.file.originalname
            },
            create:{
                fileUrl:uploadResult.secure_url,
                fileName:req.file.originalname,
                userId
            }
        })
        res.status(200).json({message:"resume replaced succesfully",resume})


    } catch (error) {
        console.error("ERROR NAME:", error.name);
        console.error("ERROR MESSAGE:", error.message);
        res.status(500).json({ message: "Failed to upload resume" });

    }


}

export const deleteResume=async(req,res)=>{
    try {
        const userId=req.user.id
        if(!userId){
            return res.status(404).json({message:"the user is not authenticaeted "})
        }
        const existing=await prisma.resume.findUnique({where:{userId}})
        if(!existing){
            res.status(404).json({message:"cant find the resume "})

        }
          if (existing.publicId) {
            await cloudinary.uploader.destroy(existing.publicId, { resource_type: "raw" });
        }
        await prisma.resume.delete({where:{userId}})
        res.status(200).json({message:"the resume deleted succesfully"})
    } catch (error) {
        console.error("ERROR NAME:", error.name);
        console.error("ERROR MESSAGE:", error.message);
        res.status(500).json({ message: "Failed to delete resume" });
    }
}