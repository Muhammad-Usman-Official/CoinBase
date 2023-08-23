import mongoose, { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    photoPath: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const Blog = model("Blog", blogSchema, "blogs");
export default Blog;
