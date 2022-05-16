import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "no token you are not authorized"));
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return next(createError(403, "token is invalid"));

    req.user = user;
    // console.log(req.user);
    next();
  });
};

export const verifyUser = (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    next(
      createError(403, "User not match or Your are not admin not authorized")
    );
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    next(createError(403, "you are not admin not authorized"));
  }
};
