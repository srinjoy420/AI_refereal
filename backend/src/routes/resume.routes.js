import {Router} from "express"
import { upload } from "../middleware/multer.middleware.js"
import { isLOggedIn } from "../middleware/auth.middleware.js"
import { uploadResume } from "../controller/resume.controller.js"

const resumeRouter=Router()
resumeRouter.post("/upload",isLOggedIn,upload.single('resume'),uploadResume)
export default resumeRouter


