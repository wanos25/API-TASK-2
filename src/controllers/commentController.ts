import { Request, Response } from "express"
import prisma from "../prisma/client"

export const addComment = async (req: Request, res: Response) => {
    try {
        const { text, postId } = req.body
        const userId = req.user?.id

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        if (!text || !postId) {
            return res.status(400).json({ message: "Text and postId are required" })
        }

        const comment = await prisma.comment.create({
            data: {
                text,
                postId,
                userId
            }
        })

        res.status(201).json(comment)
    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}

export const getComments = async (req: Request, res: Response) => {
    try {
        const comments = await prisma.comment.findMany({
            include: { user: true, post: true }
        })
        res.json(comments)
    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}
