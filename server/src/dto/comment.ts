import { Types } from "mongoose";
import { TCommentDto } from "../types";

export default class CommentDTO {
  _id: Types.ObjectId;
  createdAt: Date;
  content: string;
  authorUsername: string;
  constructor(comment: TCommentDto) {
    this._id = comment._id;
    this.authorUsername = comment.author.username;
    this.content = comment.content;
    this.createdAt = comment.createdAt;
  }
}
