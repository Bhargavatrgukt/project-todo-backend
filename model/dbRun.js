import db from "../database/db.js";

const dbRun = async (query, params = []) => {
  try {
    const result = await db.execute({
      sql: query,
      args: params,
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};

export default dbRun;
