import { Request, Response, NextFunction } from "express";
import Blog from "../database/models/blog";
import Joi from "joi";
import { mongoIdPattern } from "../utils";
import BlogDetailsDTO from "../dto/blogDetails";

export default async function getBlogByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { blogId } = req.params;

  const getBlogSchema = Joi.object({
    blogId: Joi.string().regex(mongoIdPattern).required(),
  });

  const { error } = getBlogSchema.validate(req.params);
  if (error) {
    return next(error);
  }
  let blog;
  try {
    blog = await Blog.findOne({ _id: blogId }).populate("author");
  } catch (err) {
    return next(err);
  }
  if (!blog) {
    return res.status(404).json({
      message: "The requested blog does not exist!",
    });
  }
  const blogDto = new BlogDetailsDTO(blog);
  return res.status(200).json({ blog: blogDto });
}
