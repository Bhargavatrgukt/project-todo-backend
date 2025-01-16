import express from "express";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controller/projectController.js";
import { validateRequest } from "../middleware/requestValidations.js";
import authenticationToken from "../middleware/auth.js";

const router = express.Router();

// router.use(authenticationToken);

router.post("/", validateRequest, createProject);

router.get("/", getProjects);

router.put("/:id", validateRequest, updateProject);

router.delete("/:id", deleteProject);

export default router;
