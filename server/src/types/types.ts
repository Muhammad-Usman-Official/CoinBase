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

namespace rootType {
  export type TUserDto = import("./types").TUserDto;
  export type TUser = import("./types").TUser;
  export type TUserAuth = import("./types").TUserAuth;
}

export default rootType;
