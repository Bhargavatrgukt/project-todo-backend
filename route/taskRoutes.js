import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controller/tasksController.js";

const router = express.Router();

router.post("/:project_id/tasks", createTask);

router.get("/:project_id/tasks", getAllTasks);

router.put("/:project_id/tasks/:id", updateTask);

router.delete("/:project_id/tasks/:id", deleteTask);

export default router;
