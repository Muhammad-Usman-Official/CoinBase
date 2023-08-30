import mongoose, { Schema, model } from "mongoose";

const CommentsSchema = new Schema(
  {
    content: { type: String, required: true },
    blog: { type: mongoose.SchemaTypes.ObjectId, ref: "Blog" },
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("Comment", CommentsSchema, "comments");
