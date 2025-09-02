import { Router } from "express"
import { getUsers, getUser } from "../controllers/userController"
import { verifyToken } from "../middleware/authMiddleware"

const router = Router()
router.get("/", verifyToken, getUsers)
router.get("/:id", verifyToken, getUser)
export default router
