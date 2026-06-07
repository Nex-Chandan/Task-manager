import express from "express"

const router=express.Router();
import { register, login, getMe } from "../controllers/AuthController.js";
import { protect }  from "../middleware/authMiddleware.js";

// Public routes
router.post("/register", register);
router.post("/login", login);
 
// Protected route
router.get("/me", protect, getMe);
 
export default router;
 

