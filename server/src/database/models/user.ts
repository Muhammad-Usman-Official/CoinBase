import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

interface TPost {
  title: string;
  body: string;
  tags?: string[];
  reactions?: number;
  createdAt: {
    default: number;
  };
}

export interface TUser {
  name: string;
  email: string;
  password: string;
  createdAt?: number | any;
  avatar?: string;
  posts: [TPost];
}

const post = new Schema<TPost>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  tags: [String],
  reactions: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new Schema<TUser>({
  // USER NAME
  name: {
    type: String,
    required: [true, "Your name is required"],
    unique: true,
  },
  // USER EMAIL ADDRESS
  email: {
    type: String,
    unique: true,
    required: [true, "Your email is required"],
  },
  // USER PASSWORD
  password: { type: String, required: [true, "Your password is required"] },
  // CREATION DATE
  createdAt: { type: Date, default: Date.now() },
  // USER AVATAR
  avatar: { type: String },
  // USER BLOG POSTS
  posts: { type: [post], default: undefined },
});

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

export const User = mongoose.model("User", UserSchema);
