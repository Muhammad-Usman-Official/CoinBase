import { Types } from "mongoose";

export interface TUserAuth {
  username: string;
  name: string;
  email: string;
  password: string;
  consfirmPassword: string;
  createdAt?: Date;
  avatar?: string;
  _id: Types.ObjectId;
}

export interface TUser {
  username: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  avatar?: string;
  _id: Types.ObjectId;
}

export interface TUserDto {
  _id: Types.ObjectId;
  name: string;
  username: string;
  email: string;
}

export interface TBlog {
  title: string;
  body: string;
  tags?: string[];
  _id: Types.ObjectId;
  reactions?: number;
  photoPath: string;
  photo?: string;
  content: string;
  author: Types.ObjectId;
  createdAt: {
    default: Date;
  };
}

export interface TCreateBlog {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  title: string;
  content: string;
  photo: string;
  photoPath?: string;
}

export interface TBLogDetails {
  author: TUser;
  content: string;
  photoPath: string;
  title: string;
  _id: Types.ObjectId;
  name: string;
  authorName: string;
  authorUserName: string;
  authorEmail: string;
  createdAt: Date;
}

export interface TComment {
  author: Types.ObjectId;
  blog: Types.ObjectId;
  content: string;
}

export interface TCommentDto {
  author: TUser;
  _id: Types.ObjectId;
  createdAt: Date;
  content: string;
  authorUsername: string;
}

namespace rootType {
  export type TUserDto = import(".").TUserDto;
  export type TUser = import(".").TUser;
  export type TUserAuth = import(".").TUserAuth;
  export type TBlog = import(".").TBlog;
  export type TBlogDetails = import(".").TBLogDetails;
  export type TComment = import(".").TComment;
  export type TCommentDto = import(".").TCommentDto;
}

export default rootType;
