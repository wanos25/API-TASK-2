import { Router } from "express"
import { addComment, getComments } from "../controllers/commentController"
import { verifyToken } from "../middleware/authMiddleware"

const router = Router()
router.post("/", verifyToken, addComment)
router.get("/", getComments)
export default router
