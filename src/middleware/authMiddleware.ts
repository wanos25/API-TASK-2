import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import prisma from "../prisma/client"

interface JwtPayload {
    id: number
}

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
        const user = await prisma.user.findUnique({ where: { id: decoded.id } })
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        req.user = user
        next()
    } catch {
        res.status(401).json({ message: "Invalid token" })
    }
}
