import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controller/commentController.js";
import { validateRequest } from "../middleware/requestValidations.js";
import authenticationToken from "../middleware/auth.js";

const router = express.Router();

router.use(authenticationToken);

router.post("/comments", validateRequest, addComment);
router.get("/comments", getComments);
router.put("/comments/:commentId", validateRequest, updateComment);
router.delete("/comments/:commentId", deleteComment);

export default router;
