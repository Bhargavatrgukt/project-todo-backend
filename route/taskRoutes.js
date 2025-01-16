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

router.post("/", validateRequest, createTask);

router.get("/", getAllTasks);

router.put("/:id", validateRequest, updateTask);

router.delete("/:id", deleteTask);

export default router;
