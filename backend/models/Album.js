import mongoose from "mongoose";
const AlbumSchema = mongoose.Schema({
  albumName: { type: String, required: true },
  lastDateUpdate: { type: Date, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Album", AlbumSchema);
