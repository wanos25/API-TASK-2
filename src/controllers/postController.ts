import { Request, Response } from "express"
import prisma from "../prisma/client"

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, categoryId } = req.body
        const userId = req.user?.id

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        if (!title || !content || !categoryId) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                categoryId,
                userId
            }
        })

        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.post.findMany({
            include: { category: true, user: true }
        })
        res.json(posts)
    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}
