import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import RefreshToken from "../database/models/token";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config";
import { Types } from "mongoose";

class JWTService {
  // sign access token
  static signAccessToken(payload: JwtPayload, expiryTime: number | string) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET!, { expiresIn: expiryTime });
  }
  // sign refresh token
  static signRefreshToken(payload: JwtPayload, expiryTime: number | string) {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET!, { expiresIn: expiryTime });
  }
  //verify access token
  static verifyAccessToken(token: string) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET!) as JwtPayload;
  }
  // verify refresh toekn
  static verifyRefreshToken(token: string) {
    return jwt.verify(token, REFRESH_TOKEN_SECRET!) as JwtPayload;
  }
  // store refresh token
  static async storeRefreshToken(token: string, userId: Types.ObjectId) {
    try {
      const newToken = new RefreshToken({
        token: token,
        userId: userId,
      });
      await newToken.save();
    } catch (error) {
      console.log(error);
    }
  }
}

export default JWTService;
