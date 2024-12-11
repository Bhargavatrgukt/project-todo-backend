import * as Project from "../model/project.js";
import * as Yup from "yup";

const projectSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  color: Yup.string().required("Color is required"),
  is_favorite: Yup.boolean().required("is_favorite is required"),
});

const validateRequest = async (req, res, schema) => {
  try {
    return await schema.validate(req.body, { abortEarly: false });
  } catch (err) {
    res.status(400).json({ message: "Validation failed", errors: err.errors });
    throw err; // Stop further execution if validation fails
  }
};

export const createProject = async (req, res) => {
  try {
    const { name, color, is_favorite } = await validateRequest(
      req,
      res,
      projectSchema
    );
    const result = await Project.createProject(name, color, is_favorite);
    res.status(201).json({ id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const rows = await Project.getProjects();
    // console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    // const { id } = req.params;
    // const { name, color, isFavorite } = req.body;
    const { name, color, is_favorite } = await validateRequest(
      req,
      res,
      projectSchema
    );
    const change = await Project.updateProject(id, name, color, isFavorite);
    if (change === 0) {
      return res.status(204).send("no content");
    }
    res.status(200).send("updated successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const change = await Project.deleteProject(id);
    console.log(change);
    if (!change) {
      return res.status(204).send("no content");
    }
    res.status(200).send("Deleted  successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
