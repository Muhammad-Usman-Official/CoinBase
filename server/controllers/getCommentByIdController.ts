import { Request, Response, NextFunction } from "express";
import Comment from "../database/models/comment";
import Joi from "joi";
import { mongoIdPattern } from "../utils";
import { TCommentDto } from "../types/types";
import CommentDTO from "../dto/comment";

export default async function getCommentByIdController(
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
  let comments: TCommentDto[];
  try {
    comments = await Comment.find({ blog: blogId }).populate("author");
  } catch (err) {
    return next(err);
  }
  if (!comments) {
    return res.status(404).json({
      message: "No comments.",
    });
  }

  const commentsDto = [];
  for (let i = 0; i < comments.length; i++) {
    let obj = new CommentDTO(comments[i]);
    commentsDto.push(obj);
  }

  return res.status(200).json({ comments: commentsDto });
}
