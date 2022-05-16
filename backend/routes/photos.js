import express from "express";
import {
  createPhoto,
  getAlbumPhotos,
  getAllUsersPhotos,
  getPhoto,
  getUserPhotos,
  updatePhoto,
} from "../controllers/photo.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

// CREATE
router.post("/:userId/:albumId", verifyToken, createPhoto);

// UPDATE
router.put("/:userId/:albumId/:photoId", verifyToken, updatePhoto);

// GET
router.get("/:userId/:albumId/:photoId", verifyToken, getPhoto);

//GET ALL PHOTOS OF A ALBUM
router.get("/:userId/:albumId", verifyToken, getAlbumPhotos);

// GET ALL USER PHOTOS
router.get("/:userId", verifyToken, getUserPhotos);

// GET ALL PHOTOS
router.get("/", verifyToken, verifyAdmin, getAllUsersPhotos);

export default router;
