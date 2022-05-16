import bcrypt from "bcrypt";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    if (req.body.phoneNumber.length < 10 || req.body.phoneNumber.lenght > 10)
      return next(createError(400, "phone number must be 10 digit"));
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const isPhoneNumberUnique = await User.find({
      phoneNumber: req.body.phoneNumber,
    });
    if (isPhoneNumberUnique.length !== 0)
      return next(createError(400, "phone number is already used"));
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      password: hash,
    });
    await newUser.save();
    res.status(200).json(`User ${req.body.firstName} has created successfully`);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Password is incorrect"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        message: `login successful ${user.firstName}`,
      });
  } catch (error) {
    next(error);
  }
};
