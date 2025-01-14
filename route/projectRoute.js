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

router.post("/projects", validateRequest, createProject);

router.get("/projects", getProjects);

router.put("/projects/:id", validateRequest, updateProject);

router.delete("/projects/:id", deleteProject);

export default router;
