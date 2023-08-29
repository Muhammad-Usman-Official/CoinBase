import { Types } from "mongoose";

export interface TUserAuth {
  username: string;
  name: string;
  email: string;
  password: string;
  consfirmPassword: string;
  createdAt?: number | any;
  avatar?: string;
  _id: Types.ObjectId;
}

export interface TUser {
  username: string;
  name: string;
  email: string;
  password: string;
  createdAt?: number | any;
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
    default: number;
  };
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
  createdAt: number;
}

namespace rootType {
  export type TUserDto = import("./types").TUserDto;
  export type TUser = import("./types").TUser;
  export type TUserAuth = import("./types").TUserAuth;
  export type TBlog = import("./types").TBlog;
  export type TBlogDetails = import("./types").TBLogDetails;
}

export default rootType;
