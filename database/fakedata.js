import { faker } from "@faker-js/faker";
import db from "./db.js";

// Generate users with unique emails
// const generateUsers = () => {
//   let users = [];

//   for (let i = 1; i <= 10000; i++) {
//     users.push({
//       name: faker.person.firstName(),
//       email: `${faker.internet.username()}${i}@gmail.com`, // Generate email like user1@gmail.com, user2@gmail.com, etc.
//     });
//   }

//   return users;
// };

// // Insert users into the database
// const insertUsers = () => {
//   const users = generateUsers();
//   const query = "INSERT INTO users (name, email) VALUES (?, ?)";

//   db.serialize(() => {
//     db.run("BEGIN TRANSACTION", (err) => {
//       if (err) {
//         console.error("Error starting transaction for users:", err.message);
//         return;
//       }

//       users.forEach((user) => {
//         db.run(query, [user.name, user.email], (err) => {
//           if (err) {
//             console.error(`Error inserting user: ${err.message}`);
//             return;
//           }
//         });
//       });

//       db.run("COMMIT", (err) => {
//         if (err) {
//           console.error("Error committing transaction for users:", err.message);
//           db.run("ROLLBACK");
//         } else {
//           console.log("Users inserted successfully!");
//           // Call insertProjects after users are successfully inserted
//           insertProjects();
//         }
//       });
//     });
//   });
// };

// // Generate projects with random data
// const generateProjects = () => {
//   let projects = [];
//   for (let i = 0; i < 1000000; i++) {
//     projects.push({
//       name: `project${i + 1}`,
//       color: faker.color.human(),
//       is_favorite: faker.datatype.boolean(),
//       user_id: faker.number.int({ min: 1, max: 10000 }), // Random user_id between 1 and 10000
//     });
//   }
//   return projects;
// };

// // Insert projects into the database
// const insertProjects = () => {
//   const projects = generateProjects();
//   const query =
//     "INSERT INTO projects (name, color, is_favorite, user_id) VALUES (?, ?, ?, ?)";

//   db.serialize(() => {
//     db.run("BEGIN TRANSACTION", (err) => {
//       if (err) {
//         console.error("Error starting transaction for projects:", err.message);
//         return;
//       }

//       projects.forEach((project) => {
//         db.run(
//           query,
//           [project.name, project.color, project.is_favorite, project.user_id],
//           (err) => {
//             if (err) {
//               console.error(`Error inserting project: ${err.message}`);
//             }
//           }
//         );
//       });

//       db.run("COMMIT", (err) => {
//         if (err) {
//           console.error(
//             "Error committing transaction for projects:",
//             err.message
//           );
//           db.run("ROLLBACK");
//         } else {
//           console.log("Projects inserted successfully!");
//         }
//       });
//     });
//   });
// };

// // Call the function to insert users and projects
// insertUsers();

const generateTask = () => {
  // id INTEGER PRIMARY KEY AUTOINCREMENT,
  //   content TEXT NOT NULL,
  //   description TEXT,
  //   due_date DATE,
  //   is_completed BOOLEAN DEFAULT FALSE,
  //   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  //   project_id INTEGER,
  let tasks = [];
  for (let i = 9000001; i <= 10000000; i++) {
    let obj = {
      content: `content-${i}`,
      description: faker.food.description(),
      due_date: faker.date.future({ years: 1 }),
      is_completed: faker.datatype.boolean(),
      project_id: faker.number.int({ min: 1, max: 1000000 }),
    };
    console.log(obj);
    tasks.push(obj);
  }
  return tasks;
};

const insertTasks = () => {
  const users = generateTask();
  const query =
    "INSERT INTO tasks (content, description, due_date, is_completed, project_id) VALUES (?, ?,?,?,?)";

  db.serialize(() => {
    db.run("BEGIN TRANSACTION", (err) => {
      if (err) {
        console.error("Error starting transaction for users:", err.message);
        return;
      }

      users.forEach((task) => {
        db.run(
          query,
          [
            task.content,
            task.description,
            task.due_date,
            task.is_completed,
            task.project_id,
          ],
          (err) => {
            if (err) {
              console.error(`Error inserting task: ${err.message}`);
              return;
            }
          }
        );
      });

      db.run("COMMIT", (err) => {
        if (err) {
          console.error("Error committing transaction for tasks:", err.message);
          db.run("ROLLBACK");
        } else {
          console.log("Tasks inserted successfully!");
          // Call insertProjects after users are successfully inserted
          // insertProjects();
        }
      });
    });
  });
};

insertTasks();
