import mongoose, { Schema, model } from "mongoose";

interface TBlog {
  title: string;
  body: string;
  tags?: string[];
  reactions?: number;
  createdAt: {
    default: number;
  };
}

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
