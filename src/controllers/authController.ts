import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import prisma from "../prisma/client"

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword }
    })
    res.status(201).json({ message: "User registered successfully", data: user });

}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(400).json({ message: "Invalid credentials" })
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(400).json({ message: "Invalid credentials" })
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
    res.json({ token })
}
