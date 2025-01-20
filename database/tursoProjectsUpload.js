import { createClient } from "@libsql/client";
import { faker } from "@faker-js/faker";
import colorPalette from "./colorPalette.js";
import dotenv from "dotenv";

dotenv.config();

// Create Turso client
const client = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const insertData = async () => {
  console.log("Starting data insertion...");

  const batchSize = 500; // Number of rows per batch
  const totalRows = 1_000_000; // Total rows to insert

  const rows = Array.from({ length: totalRows }, (_, i) => [
    `Project${i}`,
    colorPalette[Math.floor(Math.random() * colorPalette.length)].dataValue,
    i % 2 === 0,
    Math.floor(Math.random() * 1000) + 1,
  ]);

  console.time("InsertData");

  for (let i = 0; i < totalRows; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);

    const placeholders = batch.map(() => "(?, ?, ?, ?)").join(", ");

    const values = batch.flat();

    const query = `INSERT INTO projects (name, color, is_favorite, user_id) VALUES ${placeholders}`;

    try {
      await client.execute(query, values);
      console.log(`Inserted rows ${i + 1} to ${i + batch.length}`);
    } catch (error) {
      console.error("Error inserting batch:", error.message);
    }
  }

  console.timeEnd("InsertData");
  console.log("Data insertion complete!");
};

insertData().catch((err) => {
  console.error("Error during insertion:", err.message);
});
