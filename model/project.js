import db from "../database/db.js";

export const createProject = (name, color, isFavorite) => {
  const query =
    "INSERT INTO projects (name, color, is_favorite) VALUES (?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.run(query, [name, color, isFavorite], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
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

export const updateProject = (id, name, color, isFavorite) => {
  const query = `
        UPDATE projects
        SET name = ?, color = ?, is_favorite = ?
        WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.run(query, [id, name, color, isFavorite], function (err) {
      if (err) {
        reject(err);
      } else {
        console.log(`Rows affected: ${this.changes}`);
        resolve();
      }
    });
  });
};

export const deleteProject = (id) => {
  const query = "DELETE FROM projects WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.run(query, [id], function (err) {
      if (err) {
        return nreject(err);
      }
      resolve();
    });
  });
};
