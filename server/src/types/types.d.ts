import { Request } from "express";
import { TUserDto } from "./types";

declare global {
  namespace Express {
    interface Request {
      user?: TUserDto; // make the user property optional
    }
  }
}
