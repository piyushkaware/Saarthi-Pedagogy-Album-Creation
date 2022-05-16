import mongoose from "mongoose";

const PhotoSchema = mongoose.Schema({
  photoName: { type: String, required: true },
  imageUri: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
    required: true,
  },
});

export default mongoose.model("Photo", PhotoSchema);
