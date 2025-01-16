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

// router.use(authenticationToken);

router.post("/", validateRequest, addComment);
router.get("/", getComments);
router.put("/:commentId", validateRequest, updateComment);
router.delete("/:commentId", deleteComment);

export default router;
