import db from "../database/db.js";
import dbRun from "./dbRun.js";

// Get User by Username
export const getUserByUserMail = async (email) => {
  try {
    const query = "SELECT * FROM users WHERE  email = ?";
    const result = await db.execute({
      sql: query,
      args: [email],
    });
    return result.rows;
  } catch (err) {
    console.log(err);
  }
};

// Create User
export const createUser = async (name, email, password) => {
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  return dbRun(query, [name, email, password]);
};
