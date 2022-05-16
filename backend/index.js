import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import albumsRoute from "./routes/albums.js";
import photosRoute from "./routes/photos.js";
const app = express();
dotenv.config();

const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected with mongoDB successfully");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MONGODB is disconnected");
});

//middleware
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello goodmorning!!");
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/albums", albumsRoute);
app.use("/api/photos", photosRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!!!";

  res.status(errorStatus).json({
    success: false,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(5000, () => {
  Connect();
  console.log("Server is listining");
});
