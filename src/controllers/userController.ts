import { Request, Response } from "express"
import prisma from "../prisma/client"

export const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany()
    res.json(users)
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await prisma.user.findUnique({ where: { id: Number(id) } })
    if (!user) return res.status(404).json({ message: "User not found" })
    res.status(201).json({ message: "User registered successfully", data: user });

}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, email } = req.body
    const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email }
    })
    res.json(updatedUser)
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    await prisma.user.delete({ where: { id: Number(id) } })
    res.json({ message: "User deleted" })
}
