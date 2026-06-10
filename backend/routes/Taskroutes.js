import express from "express";
const router1 = express.Router();

import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  toggleStatus,
  deleteTask,
} from "../controllers/TaskController.js";

import { protect } from "../middleware/authMiddleware.js";

router1.use(protect);

router1.get("/", getTasks);
router1.post("/", createTask);
router1.get("/:id", getTask);
router1.put("/:id", updateTask);
router1.patch("/:id/status", toggleStatus);
router1.delete("/:id", deleteTask);

export default router1;
