import db from "../database/db.js";
import dbRun from "./dbRun.js";

export const createProject = (name, color, is_favorite) => {
  const query =
    "INSERT INTO projects (name, color, is_favorite) VALUES (?, ?, ?)";
  return dbRun(query, [name, color, is_favorite]);
};

export const getProjects = () => {
  const query = "SELECT * FROM projects";
  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const updateProject = (id, name, color, is_favorite) => {
  const query = `
        UPDATE projects
        SET name = ?, color = ?, is_favorite = ?
        WHERE id = ?`;
  return dbRun(query, [name, color, is_favorite, id]).then(
    (result) => result.changes
  );
};

export const deleteProject = (id) => {
  const query = "DELETE FROM projects WHERE id = ?";
  return dbRun(query, [id]).then((result) => result.changes);
};
