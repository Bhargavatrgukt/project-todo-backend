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

// export const getProjects = (callback) => {
//   const query = "SELECT * FROM projects";
//   db.all(query, [], callback);
// };

// export const updateProject = (id, name, color, isFavorite, callback) => {
//   const query = `
//         UPDATE projects
//         SET name = ?, color = ?, is_favorite = ?
//         WHERE id = ?`;
//   db.run(query, [name, color, isFavorite, id], callback);
// };

// export const deleteProject = (id, callback) => {
//   const query = "DELETE FROM projects WHERE id = ?";
//   db.run(query, [id], callback);
// };
