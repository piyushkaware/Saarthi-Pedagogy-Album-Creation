import User from "../models/User.js";
import bcrypt from "bcrypt";

// UPDATE USER
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
        },
      },
      { new: true }
    );
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            password: hash,
          },
        },
        { new: true }
      );
    }

    const { password, isAdmin, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};
// GET USER
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, isAdmin, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};
// GET ALL USER
export const getUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
