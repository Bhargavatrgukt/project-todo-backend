import db from "./db.js";
import { faker } from "@faker-js/faker";

// Configuration
const TOTAL_USERS = 10000;
const BATCH_SIZE = 500;

// Function to generate fake user data
const generateFakeUsers = (count) => {
  return Array.from({ length: count }, () => [
    faker.person.firstName(),
    faker.person.lastName(),
    faker.internet.email(),
    faker.internet.password(),
  ]);
};

// Function to insert a batch of users
const insertBatch = (batch) => {
  return new Promise((resolve, reject) => {
    const placeholders = batch.map(() => "(?, ?, ?, ?)").join(",");
    const query = `INSERT INTO users (firstname, secondname, email, password) VALUES ${placeholders}`;
    const flattenedData = batch.flat();

    db.run(query, flattenedData, (err) => {
      if (err) {
        console.error("Error inserting batch:", err.message);
        return reject(err);
      }
      resolve();
    });
  });
};

// Function to insert users in batches
const insertFakeUsers = async () => {
  console.log("Generating fake users...");
  const fakeUsers = generateFakeUsers(TOTAL_USERS);

  console.log("Inserting users in batches...");
  const batchCount = Math.ceil(fakeUsers.length / BATCH_SIZE);

  console.time("Insertion Time");

  try {
    for (let i = 0; i < batchCount; i++) {
      const batch = fakeUsers.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
      await insertBatch(batch); // Await for each batch to complete
      console.log(`Batch ${i + 1}/${batchCount} inserted successfully.`);
    }
    console.log("All users inserted successfully!");
  } catch (error) {
    console.error("Error during insertion:", error.message);
  } finally {
    db.close(() => {
      console.log("Database connection closed.");
    });
    console.timeEnd("Insertion Time");
  }
};

// Run the insertion function
insertFakeUsers();
