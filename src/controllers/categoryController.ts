import { Request, Response } from "express"
import prisma from "../prisma/client"

export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body
    const category = await prisma.category.create({ data: { name } })
    res.json(category)
}

export const getCategories = async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany({ include: { posts: true } })
    res.json(categories)
}

export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name } = req.body
    const updatedCategory = await prisma.category.update({
        where: { id: Number(id) },
        data: { name }
    })
    res.json(updatedCategory)
}

export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params
    await prisma.category.delete({ where: { id: Number(id) } })
    res.json({ message: "Category deleted" })
}
