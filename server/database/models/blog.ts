import mongoose, { Schema, model } from "mongoose";
import { TBlog } from "../../types/types";

const blogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true },
    photoPath: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Blog = model("Blog", blogSchema, "blogs");
export default Blog;
