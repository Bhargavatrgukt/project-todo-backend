import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controller/tasksController.js";
import { validateRequest } from "../middleware/requestValidations.js";
import authenticationToken from "../middleware/auth.js";

const router = express.Router();

// router.use(authenticationToken);

router.post("/tasks", validateRequest, createTask);

router.get("/tasks", getAllTasks);

router.put("/tasks/:id", validateRequest, updateTask);

router.delete("/tasks/:id", deleteTask);

export default router;
