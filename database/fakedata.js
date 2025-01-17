import sqlite3 from "sqlite3";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import colorPalette from "./colorPalette.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databasePath = path.join(__dirname, "../store", "todoDatabase.sqlite3");
const db = new sqlite3.Database(databasePath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
    return;
  }
  console.log("Connected to SQLite database.");
});

const insertUsers = (count) => {
  return new Promise((resolve) => {
    db.serialize(async () => {
      const query = `INSERT INTO users (name, email,password) VALUES (?, ?,?)`;
      const hashedPassword = await bcrypt.hash("password", 10);
      for (let i = 101; i < count + 1; i++) {
        db.run(
          query,
          [`User${i}`, `user${i}@gmail.com`, hashedPassword],
          (err) => {
            if (err) console.error("Error inserting:", err.message);
          }
        );
      }
      console.log(`${count} users inserted.`);
      resolve();
    });
  });
};

const insertProjects = (count) => {
  const batchSize = 250; // rows per batch
  console.time("insertProjectsTime");
  return new Promise((resolve) => {
    db.serialize(() => {
      for (let batchStart = 0; batchStart < count; batchStart += batchSize) {
        const values = [];
        const placeholders = [];
        for (
          let i = batchStart;
          i < Math.min(batchStart + batchSize, count);
          i++
        ) {
          values.push(
            `Project${i}`,
            colorPalette[Math.floor(Math.random() * colorPalette.length)]
              .dataValue,
            i % 2 === 0,
            faker.number.int({ min: 1, max: 1000 })
          ); // 100 Users

          placeholders.push("(?, ?, ?, ?)");
        }
        const query = `INSERT INTO projects(name, color, is_favorite, user_id) VALUES ${placeholders.join(
          ","
        )}`;
        db.run(query, values, (err) => {
          if (err) console.error("Error inserting batch:", err.message);
        });
      }
      console.timeEnd("insertProjectsTime");
      console.log(`${count} projects inserted.`);
      resolve();
    });
  });
};

const insertTasks = (count) => {
  const batchSize = 250; // rows per batch
  console.time("insertTasksTime");
  return new Promise((resolve) => {
    db.serialize(() => {
      for (let batchStart = 0; batchStart < count; batchStart += batchSize) {
        const values = [];
        const placeholders = [];
        for (
          let i = batchStart;
          i < Math.min(batchStart + batchSize, count);
          i++
        ) {
          values.push(
            `Task Content ${i}`,
            faker.number.int({ min: 1, max: 1000000 }),
            faker.number.int({ min: 1, max: 1000 })
          );
          placeholders.push("(?, ?,?)");
        }
        const query = `INSERT INTO tasks (content, project_id,user_id) VALUES ${placeholders.join(
          ","
        )}`;
        db.run(query, values, (err) => {
          if (err) console.error("Error inserting batch:", err.message);
        });
      }
      console.timeEnd("insertTasksTime");
      console.log(`${count} tasks inserted`);
      resolve();
    });
  });
};

const insertComments = (count) => {
  const batchSize = 250; // rows per batch
  console.time("insertCommentsTime");
  return new Promise((resolve) => {
    db.serialize(() => {
      for (let batchStart = 0; batchStart < count; batchStart += batchSize) {
        const values = [];
        const placeholders = [];
        for (
          let i = batchStart;
          i < Math.min(batchStart + batchSize, count);
          i++
        ) {
          const isProjectComment = Math.random() > 0.5;
          values.push(
            `Content${i}`,
            isProjectComment
              ? faker.datatype.number({ min: 1, max: 1000000 })
              : null, // 1 million projects
            isProjectComment
              ? null
              : faker.datatype.number({ min: 1, max: 100 })
          );
          placeholders.push("(?, ?, ?)");
        }
        const query = `INSERT INTO comments (content, project_id, task_id) VALUES ${placeholders.join(
          ","
        )}`;
        db.run(query, values, (err) => {
          if (err) console.error("Error inserting batch:", err.message);
        });
      }
      console.timeEnd("insertCommentsTime");
      console.log(`${count} comments inserted.`);
      resolve();
    });
  });
};

const seedDatabase = async () => {
  try {
    console.log("Seeding database...");

    // await insertUsers(1000); // 1000 Users
    // await insertProjects(1000000); // 10,00,000 Projects
    // await insertTasks(10000000); // 1,00,00,000 Tasks
    // await insertComments(10000);

    console.log("Seeding completed!");
    db.close();
  } catch (err) {
    console.error("Error seeding database:", err.message);
  }
};

seedDatabase();
//module.exports = seedDatabase;
