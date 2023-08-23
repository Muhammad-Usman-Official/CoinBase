import { ErrorRequestHandler, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { TUser, User } from "../database/models/user";
import { Error } from "mongoose";

export default function userVerification(req: Request, res: Response) {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY!, async (err: any, data: any) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data!.id);
      console.log(data);
      if (user) return res.json({ status: true, user: user.email });
      else return res.json({ status: false });
    }
  });
}
