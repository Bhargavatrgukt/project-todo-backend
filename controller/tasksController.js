import * as Task from "../model/tasks.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
// Create Task
export const createTask = asyncHandler(async (req, res) => {
  const { content, description, project_id } = req.body;
  const result = await Task.createTask(content, description, project_id);
  res.status(201).json({ id: result.lastID });
});

// Get All Tasks
export const getAllTasks = asyncHandler(async (req, res) => {
  const { due_date, is_completed, created_at } = req.query;
  const { project_id } = req.params;
  const rows = await Task.getAllTasks(
    project_id,
    due_date,
    is_completed,
    created_at
  );
  res.status(200).json(rows);
});

// Update Task
export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content, description, due_date, is_completed } = req.body;

  const change = await Task.updateTask(
    id,
    content,
    description,
    due_date,
    is_completed
  );

  if (change === 0) {
    return res.status(204).send("No content"); // No rows updated
  }

  res.status(200).send("Updated successfully");
});

// Delete Task
export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const change = await Task.deleteTask(id);

  if (!change) {
    return res.status(204).send("No content");
  }

  res.status(200).send("Deleted successfully");
});
