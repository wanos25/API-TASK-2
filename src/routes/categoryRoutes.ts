import { Router } from "express"
import { createCategory, getCategories } from "../controllers/categoryController"
import { verifyToken } from "../middleware/authMiddleware"

const router = Router()
router.post("/", verifyToken, createCategory)
router.get("/", getCategories)
export default router
