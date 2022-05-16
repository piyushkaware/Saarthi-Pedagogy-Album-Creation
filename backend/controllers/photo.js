import Photo from "../models/Photo.js";
import Album from "../models/Album.js";
import { createError } from "../utils/error.js";
import moment from "moment";
import User from "../models/User.js";

// CREATE
export const createPhoto = async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId) {
      const newPhoto = new Photo({
        photoName: req.body.photoName,
        imageUri: req.body.imageUri,
        userId: req.params.userId,
        albumId: req.params.albumId,
      });
      await newPhoto.save();

      const updatedAlbum = await Album.findByIdAndUpdate(req.params.albumId, {
        $set: {
          lastdateUpdate: moment().format("MM/DD/YYYY HH:mm:ss"),
        },
      });
      res.status(200).json({ newPhoto: newPhoto, album: updatedAlbum });
    } else {
      next(createError(403, "You are not authorized"));
    }
  } catch (error) {
    next(error);
  }
};

// UPDATE
export const updatePhoto = async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId) {
      const updatedPhoto = await Photo.findByIdAndUpdate(
        req.params.photoId,
        {
          $set: {
            photoName: req.body.photoName,
            imageUri: req.body.imageUri,
          },
        },
        { new: true }
      );
      const updatedAlbum = await Album.findByIdAndUpdate(
        req.params.albumId,
        {
          $set: { lastdateUpdate: moment().format("MM/DD/YYYY HH:mm:ss") },
        },
        { new: true }
      );
      res
        .status(200)
        .json({ updatedPhoto: updatedPhoto, updatedAlbum: updatedAlbum });
    } else {
      next(createError(403, "You are not authorized"));
    }
  } catch (error) {
    next(error);
  }
};
// GET
export const getPhoto = async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId) {
      const photo = await Photo.findById(req.params.photoId);
      if (req.params.albumId === photo.albumId.valueOf()) {
        res.status(200).json(photo);
      } else {
        createError(403, "Photo doesnot belong to input album");
      }
    } else {
      next(createError(403, "You are not authorized"));
    }
  } catch (error) {
    next(error);
  }
};

//GET ALL PHOTOS OF A ALBUM
export const getAlbumPhotos = async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId) {
      const albumPhotos = await Photo.find({ albumId: req.params.albumId });
      if (albumPhotos.length !== 0) {
        res.status(200).json(albumPhotos);
      } else {
        next(createError(400, "Album in empty"));
      }
    } else {
      next(createError(403, "you are not authorized"));
    }
  } catch (error) {
    next(error);
  }
};

// GET ALL PHOTO OF USER
export const getUserPhotos = async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId) {
      const photos = await Photo.find({ userId: req.params.userId });
      const user = await User.findById(req.params.userId);
      const { password, isAdmin, ...others } = user._doc;
      res.status(200).json({ photos: photos, user: others });
    } else {
      next(createError(403, "You are not authorized"));
    }
  } catch (error) {
    next(error);
  }
};

// GET ALL PHOTOS
export const getAllUsersPhotos = async (req, res, next) => {
  try {
    const photos = await Photo.find();
    res.status(200).json(photos);
  } catch (error) {
    next(error);
  }
};
