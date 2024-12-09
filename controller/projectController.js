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

// export const getProjects = (req, res) => {
//   Project.getProjects((err, rows) => {
//     if (err) {
//       res.status(500).send("Error fetching projects");
//     } else {
//       res.json(rows);
//     }
//   });
// };
