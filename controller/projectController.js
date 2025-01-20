import * as Project from "../model/project.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const createProject = asyncHandler(async (req, res) => {
  const { name, color, is_favorite } = req.body;
  const user_id = req.user_id;
  const result = await Project.createProject(name, color, is_favorite, user_id);
  console.log(result);
  res.status(201).json({ id: Number(result.lastInsertRowid) });
});

export const getProjects = asyncHandler(async (req, res) => {
  const user_id = req.user_id;
  const rows = await Project.getProjects(user_id);
  res.status(200).json(rows);
});

export const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, color, is_favorite } = req.body;
  const change = await Project.updateProject(id, name, color, is_favorite);
  if (change === 0) {
    return res.status(204).send("no content");
  }
  res.status(200).send("updated successfully");
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const change = await Project.deleteProject(id);
  if (!change) {
    return res.status(204).send("no content");
  }
  res.status(200).send("Deleted successfully");
});
