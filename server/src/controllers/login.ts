import { Request, Response } from "express";
import { User } from "../database/models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import createSecretToken from "../util/SecretToken";

export default async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        message: "Incorrect password or email",
      });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({
        message: "Incroorect password or email",
      });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: false,
    });
    res.status(201).json({
      message: "User logged logged in successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
  }
}
