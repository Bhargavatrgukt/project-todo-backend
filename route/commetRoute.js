import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controller/commentController.js";
import { validateRequest } from "../middleware/requestValidations.js";

const router = express.Router();

router.post("/comments", validateRequest, addComment);
router.get("/comments", getComments);
router.put("/comments/:commentId", validateRequest, updateComment);
router.delete("/comments/:commentId", deleteComment);

export default router;
