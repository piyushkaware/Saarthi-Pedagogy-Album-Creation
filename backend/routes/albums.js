import express from "express";
import {
  createAlbum,
  getAlbum,
  getAlbums,
  getUserAlbums,
  updateAlbum,
} from "../controllers/album.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// CREATE
router.post("/:userId", verifyToken, createAlbum);

// UPDATE
router.put("/:userId/:albumId", verifyToken, updateAlbum);

// GET
router.get("/:userId/:albumId", verifyToken, getAlbum);

// GET USER ALBUMS
router.get("/:userId", verifyToken, getUserAlbums);

// GET ALL
router.get("/", verifyToken, verifyAdmin, getAlbums);

export default router;
