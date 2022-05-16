import Album from "../models/Album.js";
import moment from "moment";
import { createError } from "../utils/error.js";
import User from "../models/User.js";

// CREATE
export const createAlbum = async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId) {
      const newAlbum = new Album({
        albumName: req.body.albumName,
        lastDateUpdate: moment().format("MM/DD/YYYY HH:mm:ss"),
        userId: req.params.userId,
      });
      await newAlbum.save();
      res.status(200).json(newAlbum);
    } else {
      next(createError(403, "You are not authorized"));
    }
  } catch (error) {
    next(error);
  }
};

// UPDATE
export const updateAlbum = async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId) {
      const updatedalbum = await Album.findByIdAndUpdate(
        req.params.albumId,
        {
          $set: {
            albumName: req.body.albumName,
            lastDateUpdate: moment().format("MM/DD/YYYY HH:mm:ss"),
          },
        },
        { new: true }
      );
      res.status(200).json(updatedalbum);
    } else {
      next(createError(403, "you are not authorized"));
    }
  } catch (error) {
    next(error);
  }
};
// GET
export const getAlbum = async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.albumId);
    // console.log(album.userId.valueOf());
    // console.log(req.params.userId);
    if (req.params.userId === album.userId.valueOf()) {
      const user = await User.findById(req.params.userId);
      const { password, isAdmin, ...others } = user._doc;
      res.status(200).json({
        album: album,
        user: others,
      });
    } else {
      next(createError(403, "user doesnot match"));
    }
  } catch (error) {
    next(error);
  }
};
// GET ALBUMS OF USER
export const getUserAlbums = async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      const albums = await Album.find({ userId: req.params.userId });
      res.status(200).json(albums);
    } else {
      next(createError(403, "You arenot authorized"));
    }
  } catch (error) {
    next(error);
  }
};
// GET ALL
export const getAlbums = async (req, res, next) => {
  try {
    const album = await Album.find();
    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};
