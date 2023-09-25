import { Types } from "mongoose";
import { TBlog } from "../types";

export default class BlogDTO {
  author: Types.ObjectId;
  content: string;
  _id: Types.ObjectId;
  title: string;
  photo: string;
  createdAt: {
    default: Date;
  };
  constructor(blog: TBlog) {
    this._id = blog._id;
    this.author = blog.author;
    this.content = blog.content;
    this.title = blog.title;
    this.photo = blog.photoPath;
    this.createdAt = blog.createdAt;
  }
}
