import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controller/tasksController.js";
import { validateRequest } from "../middleware/requestValidations.js";

const router = express.Router();

router.post("/tasks", validateRequest, createTask);

router.get("/tasks", getAllTasks);

router.put("/tasks/:id", validateRequest, updateTask);

router.delete("/tasks/:id", deleteTask);

export default router;
