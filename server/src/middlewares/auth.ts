import { NextFunction, Request, Response } from "express";
import JWTService from "../services/JWTService";
import { Types } from "mongoose";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../database/models/user";
import { TUser } from "../types/types";
import { TUserDto } from "../types/types";
import userDTO from "../dto/user";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken || !refreshToken) {
      const error = {
        status: 401,
        message: "Unauthorized",
      };
      res.status(error.status);
      return next(error);
    }
    let _id: Types.ObjectId;
    try {
      const verifyService = JWTService.verifyAccessToken(
        accessToken
      ) as JwtPayload;
      _id = verifyService._id;
    } catch (error) {
      console.log(
        "auth.ts try-catch error JWTService.verifyAccessToken failed to verify!!!",
        error
      );
      return next(error);
    }

    let user: TUser | null;
    try {
      user = await User.findOne({ _id: _id! });
    } catch (error) {
      return next(error);
    }
    const userDto: TUserDto = new userDTO(user);

    req.user = userDto;

    // calling NextFunction -> Express
  } catch (error) {
    return next(error);
  }
  next();
}
