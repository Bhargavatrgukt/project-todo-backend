import sqlite3 from "sqlite3";
import dotenv from "dotenv";
import fs from "fs";
import { createClient } from "@libsql/client";

dotenv.config();

const db = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export default db;

// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const databasePath = path.join(__dirname, "../store", "todoDatabase.sqlite3");

// const db = await turso.execute(databasePath, (err) => {
//   if (err) {
//     console.error(`Error in the database connection: ${err.message}`);
//   } else {
//     console.log("Database connected successfully!");

//     // Enable foreign key constraints
//     db.exec("PRAGMA foreign_keys = ON;", (err) => {
//       if (err) {
//         console.error("Error enabling foreign keys:", err.message);
//       } else {
//         console.log("Foreign keys enabled");
//       }
//     });
//   }
// });

// const schemaPath = path.join(__dirname, "schema.sql");
// const schema = fs.readFileSync(schemaPath, "utf-8");

// db.exec(schema, (err) => {
//   if (err) {
//     console.error(`Error in database connection: ${err.message}`);
//     process.exit(1);
//   } else {
//     console.log("Tables initialized");
//   }
// });

// export default db;

// const a = async () => {
//   const db = await turso.execute({
//     sql: "INSERT INTO users (name,email,password) VALUES (?,?,?)",
//     args: ["Rahul", "rahul1@gmail.com", "password"],
//   });
//   console.log(db);
// };

// const run = async () => {
//   try {
//     const k = await a();
//     console.log(k);
//   } catch (err) {
//     console.log("Error in querying:", err.message);
//   }
// };

// run();
