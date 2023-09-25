import { Request, Response, NextFunction } from "express";
import Comment from "../database/models/comment";

export default async function createCommentController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /* PROCESS
   * Get comment content from the body
   * add to db
   * return the response
   */

  const { author, blog, content } = req.body;

  try {
    const createCommentQuery = new Comment({ author, blog, content });
    await createCommentQuery.save();
  } catch (err) {
    return next(err);
  }

  return res.status(201).json({ message: "Comment created successfully." });
}
