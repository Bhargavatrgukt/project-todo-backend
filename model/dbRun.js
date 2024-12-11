import db from "../database/db.js";

const dbRun = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this); // Provides metadata like lastID or changes
      }
    });
  });
};

export default dbRun;
