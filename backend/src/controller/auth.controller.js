import { prisma } from "../lib/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


export const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(404).json({ message: "the credentials are required" })
    }
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return res.status(400).json({ message: "user already exist" })

        }
        const hasedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hasedPassword
            }
        })
        const token = jwt.sign({ id: newUser },
            process.env.TOKEN_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRY }
        );
        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.status(201).json({
            message: "user created succfully", user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,

            }
        })
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: error.message });
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "please fill the credentials" })
    }
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRY }
        );
        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.status(200).json({
            message: "user logged in succesfully",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
        })
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Login failed" });
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
        })
        res.status(200).json({ success: true, message: "Logout successful" });
    }
    catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ error: "Failed to log out" });
    }
}
export const checkAuth = async (req, res) => {
    try {
        res.status(200).json({ success: true, user: req.user, message: "user is authenticated" })
    }
    catch (error) {
        console.error("Auth Check Error:", error);
        res.status(500).json({ error: "Failed to check authentication" });
    }
}
