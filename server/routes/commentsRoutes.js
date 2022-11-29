import express from "express";
import { getAllComments, createComment, commentsFromOneUser, updateComment, deleteComment } from "../controllers/commentsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { jwtAuth } from "../middleware/passport.js";
import { authorizationToken } from "../middleware/authorization.js";

const router = express.Router();

router.get("/all", authMiddleware, getAllComments);
router.post("/create", jwtAuth, createComment);
router.get("/oneuser", authMiddleware, commentsFromOneUser);
router.put("/update", jwtAuth, updateComment);
router.delete("/delete", jwtAuth, deleteComment);

export default router;