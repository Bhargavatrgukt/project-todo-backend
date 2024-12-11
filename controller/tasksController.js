import * as Task from "../model/tasks.js";
import * as Yup from "yup";

// Validation schema for tasks
const taskSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
  description: Yup.string().nullable(),
  due_date: Yup.date().nullable(),
  is_completed: Yup.boolean()
    .nullable()
    .typeError("is_completed is a  boolean"),
});

const validateRequest = async (req, res, schema) => {
  try {
    return await schema.validate({ ...req.body }, { abortEarly: false });
  } catch (err) {
    res.status(400).json({ message: "Validation failed", errors: err.errors });
    throw new Error("Validation failed"); // Prevent further execution
  }
};

export const createTask = async (req, res) => {
  try {
    const { project_id } = req.params;
    const { content, description, due_date, is_completed } =
      await validateRequest(req, res, taskSchema);
    const result = await Task.createTask(
      content,
      description,
      due_date,
      is_completed,
      project_id
    );
    res.status(201).json({ id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const { project_id } = req.params;
    const rows = await Task.getAllTasks(project_id);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, description, due_date, is_completed } =
      await validateRequest(req, res, taskSchema);

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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const change = await Task.deleteTask(id);
    console.log(change);
    if (!change) {
      return res.status(204).send("no content");
    }
    res.status(200).send("Deleted  successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
