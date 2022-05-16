import express from "express";
import { getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// UPDATE USER
router.put("/:id", verifyToken, verifyUser, updateUser);
// GET USER
router.get("/:id", verifyToken, verifyUser, getUser);
// GET ALL USER
router.get("/", verifyToken, verifyAdmin, getUsers);

export default router;
