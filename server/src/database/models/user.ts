import { Schema, model } from "mongoose";
import types from "../../types/types";
const UserSchema = new Schema<types.TUser>(
  {
    // userName
    username: {
      type: String,
      required: true,
      unique: true,
    },
    // NAME
    name: {
      type: String,
      required: true,
    },
    // USER EMAIL ADDRESS
    email: {
      type: String,
      unique: true,
      required: true,
    },
    // USER PASSWORD
    password: { type: String, required: true },
    // USER AVATAR
    avatar: { type: String },
  },
  { timestamps: true }
);

export const User = model("User", UserSchema);
