import express from "express";
import { getAllUsers, getUserById, signUp, login, getProfile, checkVerify, updateUser } from "../controllers/usersController.js";
import validInfo from "../middleware/validInfo.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizationToken } from "../middleware/authorization.js";
import { jwtAuth } from "../middleware/passport.js";

const router = express.Router();

// /!\ order and path of routes when using url parameters!
router.get("/all", getAllUsers);
router.get("/id/:id", getUserById);

//routes with middleware
router.post("/signup", validInfo, signUp);
router.post("/login", validInfo, login);
router.get("/profile", /* authMiddleware, */authorizationToken, getProfile);
router.get("/verified", authorizationToken, checkVerify);
router.put("/update", jwtAuth, updateUser);

export default router;