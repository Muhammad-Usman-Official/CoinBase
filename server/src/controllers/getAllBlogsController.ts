import { Request, Response, NextFunction } from "express";
import Blog from "../database/models/blog";
import BlogDTO from "../dto/blog";
import { TBlog } from "../types";

export default async function getAllBlogsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let blogs: TBlog[];
  try {
    blogs = await Blog.find();

    const blogsDto = [];

    for (let i = 0; i < blogs.length; i++) {
      const blogDto = new BlogDTO(blogs[i]);
      blogsDto.push(blogDto);
    }

    return res.status(200).json(blogsDto);
  } catch (err) {
    next(err);
  }
}
