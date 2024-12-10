import db from "../database/db.js";

export const validateProjectExists = (req, res, next) => {
  const { project_id } = req.params;

  const query = "SELECT id FROM projects WHERE id = ?";
  db.get(query, [project_id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Project not found" });
    }
    next();
  });
};
