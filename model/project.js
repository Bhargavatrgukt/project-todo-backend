import db from "../database/db.js";
import dbRun from "./dbRun.js";

export const createProject = (name, color, is_favorite, user_id) => {
  const query =
    "INSERT INTO projects (name, color, is_favorite,user_id) VALUES (?, ?, ?,?)";
  return dbRun(query, [name, color, is_favorite, user_id]);
};

export const getProjects = async (user_id) => {
  try {
    const query = "SELECT * FROM projects where user_id=?";
    const projects = await db.execute({
      sql: query,
      args: [user_id],
    });
    return projects.rows;
  } catch (err) {
    console.log(err);
  }
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
