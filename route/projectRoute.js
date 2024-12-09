import express from "express";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controller/projectController.js";

const router = express.Router();

router.post("/projects", createProject);

router.get("/projects", getProjects);

router.put("/projects/:id", updateProject);

router.delete("/projects/:id", deleteProject);

export default router;
