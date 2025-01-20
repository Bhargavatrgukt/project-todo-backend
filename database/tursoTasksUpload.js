import { createClient } from "@libsql/client";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";

dotenv.config();

// Create Turso client
const client = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const insertData = async () => {
  console.log("Starting data insertion...");

  const batchSize = 5000; // Number of rows per batch
  const totalRows = 10000000; // Total rows to insert

  const rows = Array.from({ length: totalRows }, (_, i) => [
    `Task Content ${i}`,
    faker.number.int({ min: 1, max: 1000000 }),
    faker.number.int({ min: 1, max: 1000 }),
  ]);

  console.time("InsertData");

  for (let i = 1000000; i < totalRows; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);

    const placeholders = batch.map(() => "(?, ?, ?)").join(", ");

    const values = batch.flat();

    const query = `INSERT INTO tasks (content, project_id,user_id) VALUES ${placeholders}`;

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
