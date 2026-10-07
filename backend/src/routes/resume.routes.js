import {Router} from "express"
import { upload } from "../middleware/multer.middleware.js"
import { isLOggedIn } from "../middleware/auth.middleware.js"
import { uploadResume,getResume, replaceResume,deleteResume } from "../controller/resume.controller.js"

const resumeRouter=Router()
resumeRouter.post("/upload",isLOggedIn,upload.single('resume'),uploadResume)
resumeRouter.get("/getresume",isLOggedIn,getResume)
resumeRouter.put("/replaceresume",isLOggedIn,upload.single('resume'),replaceResume)
resumeRouter.delete("/deleteresume",isLOggedIn,deleteResume)
export default resumeRouter


