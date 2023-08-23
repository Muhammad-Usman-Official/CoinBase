import { Request, Response } from "express";
import { User } from "../database/models/user";

export default async function getUsers(req: Request, res: Response) {
  const users = await User.find();
  return res.json(users);
}
