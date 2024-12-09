import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";

// const databasePath = path.join(__dirname, "..", "todoDatabase.sqlite3");  //in es6 __dirname is not valid

const db = new sqlite3.Database("./todoDatabase.sqlite3", (err) => {
  if (err) {
    console.error(`Error in the database connection: ${err.message}`);
  } else {
    console.log("Database connected successfully!");
  }
});

const schema = fs.readFileSync("./database/schema.sql", "utf-8");
db.exec(schema, (err) => {
  if (err) {
    console.error("Error creating tables", err);
  } else {
    console.log("Tables initialized");
  }
});

export default db;
