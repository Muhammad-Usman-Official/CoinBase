import { Types } from "mongoose";
import { TBLogDetails, TUser } from "../types/types";

export default class BlogDetailsDTO {
  _id: Types.ObjectId;
  content: string;
  title: string;
  photo: string;
  authorName: string;
  authorUserName: string;
  createdAt: number;
  authorEmail: string;
  constructor(blog: TBLogDetails) {
    this._id = blog._id;
    this.content = blog.content;
    this.title = blog.title;
    this.photo = blog.photoPath;
    this.authorName = blog.author.name;
    this.authorEmail = blog.author.email;
    this.createdAt = blog.createdAt;
    this.authorUserName = blog.author.username;
  }
}
