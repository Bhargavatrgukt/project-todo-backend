import * as Comment from "../model/comment.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { getParentDetails } from "./utils.js";

// Add Comment
export const addComment = asyncHandler(async (req, res) => {
  const { user_id, content, task_id, project_id } = req.body;
  const { parentColumn, parent_id } = getParentDetails(task_id, project_id);

  await Comment.addComment(user_id, content, parentColumn, parent_id);
  res.status(201).json(`Commented by user ${user_id} on ${parentColumn}`);
});

// Get Comments
export const getComments = asyncHandler(async (req, res) => {
  const { task_id, project_id } = req.body;
  const { parentColumn, parent_id } = getParentDetails(task_id, project_id);

  const rows = await Comment.getComments(parentColumn, parent_id);
  res.status(200).json(rows);
});

// Update Comment
export const updateComment = asyncHandler(async (req, res) => {
  const { user_id, content, task_id, project_id } = req.body;
  const { commentId } = req.params;
  const { parentColumn, parent_id } = getParentDetails(task_id, project_id);

  const change = await Comment.updateComment(
    user_id,
    content,
    parentColumn,
    parent_id,
    commentId
  );
  if (change === 0) {
    return res.status(204).json({ msg: "No content" });
  }

  res.status(200).send("Updated successfully");
});

// Delete Comment
export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { user_id } = req.body;

  await Comment.deleteComment(commentId, user_id);
  res.status(200).json("Deleted successfully");
});
