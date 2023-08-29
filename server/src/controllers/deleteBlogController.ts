import { Request, Response, NextFunction } from "express";
import Blog from "../database/models/blog";
import BlogDTO from "../dto/blog";
import Comment from "../database/models/comment";
import Joi from "joi";
import { mongoIdPattern } from "../utils";

export default async function deleteBlogController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { blogId } = req.params;

  const deleteBlogSchema = Joi.object({
    _id: Joi.string().regex(mongoIdPattern).required(),
  });
  deleteBlogSchema.validate(req.params);
  try {
    /* Running a query to find blog by id and the delete that blog */
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    await Comment.deleteMany({ blog: blogId });
    if (!deletedBlog) {
      return res.status(404).json({
        message: "Unable to delete the blog because the blog does not exist!",
      });
    }
    return res.status(200).json({ message: "Blog deleted successfully." });
  } catch (err) {
    return next(err);
  }
}
