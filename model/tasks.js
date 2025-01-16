import db from "../database/db.js";
import dbRun from "./dbRun.js";
// import { startOfDay, endOfDay } from "date-fns";

export const createTask = (
  content,
  description,
  due_date,
  is_completed,
  project_id
) => {
  const query =
    "INSERT INTO tasks (content,description,due_date , is_completed ,project_id) VALUES (?, ?, ?,?,?)";
  return dbRun(query, [
    content,
    description,
    due_date,
    is_completed,
    project_id,
  ]);
};

export const getAllTasks = (
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
  console.log(params);
  // query += " limit 10";
  return new Promise((resolve, reject) => {
    db.all(query, params, function (err, rows) {
      if (err) {
        return reject(err);
      }
      console.log(rows);
      resolve(rows);
    });
  });
};

export const updateTask = (
  task_id,
  content,
  description,
  due_date,
  is_completed
) => {
  const query = `
      UPDATE tasks 
      SET content = ?, description = ?, due_date = ?, is_completed = ?
      WHERE id = ?
    `;

  return dbRun(query, [
    content,
    description,
    due_date,
    is_completed,
    task_id,
  ]).then((result) => result.changes);
};

export const deleteTask = (id) => {
  const query = `DELETE FROM tasks WHERE id=?`;
  return dbRun(query, [id]).then((result) => result.changes);
};
