import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databasePath = path.join(__dirname, "store", "todoDatabase.sqlite3");

const db = new sqlite3.Database(databasePath, (err) => {
  if (err) {
    console.error(`Error in the database connection: ${err.message}`);
  } else {
    console.log("Database connected successfully!");

    // Enable foreign key constraints
    db.exec("PRAGMA foreign_keys = ON;", (err) => {
      if (err) {
        console.error("Error enabling foreign keys:", err.message);
      } else {
        console.log("Foreign keys enabled");
      }
    });
  }
});

const schemaPath = path.join(__dirname, "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf-8");

db.exec(schema, (err) => {
  if (err) {
    console.error("Error creating tables", err);
    process.exit(1); // Exit application on critical failure
  } else {
    console.log("Tables initialized");
  }
});

export default db;
