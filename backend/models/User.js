import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    maxlength: 10,
    minlength: 10,
  },
  password: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
});

export default mongoose.model("User", UserSchema);
