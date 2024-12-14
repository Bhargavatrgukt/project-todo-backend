// utils.js
export const getParentDetails = (task_id, project_id) => {
  const parentColumn = task_id ? "task_id" : "project_id";
  const parent_id = task_id ? task_id : project_id;
  return { parentColumn, parent_id };
};
