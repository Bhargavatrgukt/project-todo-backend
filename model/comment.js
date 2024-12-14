import db from "../database/db.js";
import dbRun from "./dbRun.js";

export const addComment = (user_id, content, parentColumn, parent_id) => {
  const query = `INSERT INTO comments (user_id,content,${parentColumn}) VALUES (?,?, ?)`;
  return dbRun(query, [user_id, content, parent_id]);
};

export const getComments = (parentColumn, parent_id) => {
  const query = `SELECT * FROM comments where ${parentColumn}=?`;
  return new Promise((resolve, reject) => {
    db.all(query, [parent_id], function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

export const updateComment = (
  user_id,
  content,
  parentColumn,
  parent_id,
  commentId
) => {
  console.log(commentId);
  const query = `UPDATE comments SET content = ? WHERE ${parentColumn} = ? and user_id = ? and id = ?`;
  return dbRun(query, [content, parent_id, user_id, commentId]).then(
    (result) => result.changes
  );
};

export const deleteComment = (commentId, user_id) => {
  const query = "DELETE FROM comments WHERE id = ? and user_id=?";
  return dbRun(query, [commentId, user_id]).then((result) => result.changes);
};
