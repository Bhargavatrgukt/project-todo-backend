import * as Project from "../model/project.js";

export const createProject = async (req, res) => {
  const { name, color, isFavorite } = req.body;

  try {
    const result = await Project.createProject(name, color, isFavorite);
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
    const { id } = req.params;
    const { name, color, isFavorite } = req.body;
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
