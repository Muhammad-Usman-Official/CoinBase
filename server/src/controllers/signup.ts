import { Request, Response } from "express";
import { User } from "../database/models/user";
import createSecretToken from "../util/SecretToken";

export default async function signup(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = new User({ name: name, email: email, password: password });
    await user.save();
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
  } catch (error) {
    console.error(error);
  }
}
