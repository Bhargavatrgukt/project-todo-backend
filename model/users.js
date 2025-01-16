import db from "../database/db.js";
import dbRun from "./dbRun.js";

// Get User by Username
export const getUserByUserMail = async (email) => {
  const query = "SELECT * FROM users WHERE  email = ?";
  return new Promise((resolve, reject) => {
    db.get(query, [email], function (err, row) {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
};

// Create User
export const createUser = async (name, email, password, gender) => {
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  return dbRun(query, [name, email, password, gender]);
};
