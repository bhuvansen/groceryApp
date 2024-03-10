import { Request, Response, NextFunction } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user"
import dotenv from "dotenv"
const { v4: uuidv4 } = require("uuid")

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

exports.signup = async (req: Request, res: Response) => {
    const { email, password, role } = req.body
    try {
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({ email, password: hashedPassword, role, id: uuidv4() })

        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
      console.log("ERROR HERE", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.signin = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const userData: any = user

        const passwordMatch = await bcrypt.compare(password, userData.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const token = jwt.sign({ userId: userData.id }, JWT_SECRET as string, { expiresIn: JWT_EXPIRES_IN })
        const expireDate = new Date()
        expireDate.setDate(expireDate.getDate() + 9999)
        res.cookie("token", token, { expires: expireDate })
        return res.status(200).json({ token, user: { id: userData.id, email, role: userData.role } })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}
exports.signout = async (req: Request, res: Response) => {
    res.clearCookie("token")
    res.json({ message: "Logged out successfully" })
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "Unauthorized. Token not provided." })
        }

        const decodedToken = jwt.verify(token, JWT_SECRET as string) as { userId: string }
        const userIdFromToken = decodedToken.userId

        const userIdFromUrl = req.params.userId

        if (userIdFromToken !== userIdFromUrl) {
            return res.status(401).json({ message: "Unauthorized. Invalid user ID." })
        }

        const user: any = await User.findByPk(userIdFromToken)

        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. User is not an admin." })
        }

        next()
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Unauthorized. Invalid token." })
        }
        res.status(500).json({ message: "Internal server error" })
    }
}
