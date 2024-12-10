import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controller/tasksController.js";
import { validateProjectExists } from "../middleware/validProject.js";

const router = express.Router();

router.post("/:project_id/tasks", validateProjectExists, createTask);

router.get("/:project_id/tasks", validateProjectExists, getAllTasks);

router.put("/:project_id/tasks/:id", validateProjectExists, updateTask);

router.delete("/:project_id/tasks/:id", validateProjectExists, deleteTask);

export default router;
