import db from "../database/db.js";
import dbRun from "./dbRun.js";
// import { startOfDay, endOfDay } from "date-fns";

export const createTask = (content, description, project_id, user_id) => {
  const query =
    "INSERT INTO tasks (content,description,project_id,user_id) VALUES (?, ?, ?,?)";
  console.log("Parameters:", { content, description, project_id, user_id });

  return dbRun(query, [content, description, project_id, user_id]);
};

export const getAllTasks = async (
  project_id,
  due_date,
  is_completed,
  created_at,
  user_id
) => {
  let query = "SELECT * FROM tasks WHERE user_id=?";
  const params = [user_id];

  if (project_id) {
    query += " AND project_id = ?";
    params.push(project_id);
  }
  if (due_date) {
    query += " AND due_date = ?";
    params.push(due_date);
  }

  if (is_completed) {
    query += " AND is_completed = ?";
    params.push(is_completed === "true" ? 1 : 0);
  }
  if (created_at) {
    query += " AND created_at >= ?";
    params.push(created_at);
  }

  // query += " limit 10";
  try {
    const tasks = await db.execute({
      sql: query,
      args: params,
    });
    return tasks.rows;
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = (task_id, content, description) => {
  const query = `
      UPDATE tasks 
      SET content = ?, description = ?
      WHERE id = ?
    `;

  return dbRun(query, [content, description, task_id]).then(
    (result) => result.changes
  );
};

export const deleteTask = (id) => {
  const query = `DELETE FROM tasks WHERE id=?`;
  return dbRun(query, [id]).then((result) => result.changes);
};
