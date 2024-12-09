import db from "../database/db.js";

export const createTask = (
  content,
  description,
  due_date,
  is_completed,
  project_id
) => {
  const query =
    "INSERT INTO tasks (content,description,due_date , is_completed ,project_id) VALUES (?, ?, ?,?,?)";
  return new Promise((resolve, reject) => {
    db.run(
      query,
      [content, description, due_date, is_completed || false, project_id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      }
    );
  });
};

export const getAllTasks = (project_id) => {
  const query = `select * from tasks where project_id=?`;
  return new Promise((resolve, reject) => {
    db.all(query, [project_id], function (err, rows) {
      if (err) {
        return reject(err);
      }
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

  return new Promise((resolve, reject) => {
    db.run(
      query,
      [content, description, due_date, is_completed, task_id], // Correct parameter order
      function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      }
    );
  });
};

export const deleteTask = (id) => {
  const query = `DELETE FROM tasks WHERE id=?`;
  return new Promise((resolve, reject) => {
    db.run(query, [id], function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this.changes);
    });
  });
};
