import { Router } from "express"
import { createPost, getPosts } from "../controllers/postController"
import { verifyToken } from "../middleware/authMiddleware"

const router = Router()
router.post("/", verifyToken, createPost)
router.get("/", getPosts)
export default router
