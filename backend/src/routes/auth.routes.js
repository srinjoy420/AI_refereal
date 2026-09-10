import {Router} from "express"
import { register,login,logout,checkAuth } from "../controller/auth.controller.js"
import { isLOggedIn } from "../middleware/auth.middleware.js"



const authRouter=Router()
authRouter.post('/singup',register)
authRouter.post('/login',login)
authRouter.post('/logout',isLOggedIn,logout)
authRouter.get('/check',isLOggedIn,checkAuth)
export default authRouter