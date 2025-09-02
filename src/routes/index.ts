import { Router } from "express";
import { register, login } from "../controllers/authController";
import { getUsers, getUser, updateUser, deleteUser } from "../controllers/userController";
import { createCategory, getCategories } from "../controllers/categoryController";
import { createPost, getPosts } from "../controllers/postController";
import { addComment, getComments } from "../controllers/commentController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

// Auth
router.post("/register", register);
router.post("/login", login);

// Users
router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUser);
router.put("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);

// Categories
router.post("/categories", verifyToken, createCategory);
router.get("/categories", getCategories);

// Posts
router.post("/posts", verifyToken, createPost);
router.get("/posts", getPosts);

// Comments
router.post("/comments", verifyToken, addComment);
router.get("/comments", getComments);

export default router;
