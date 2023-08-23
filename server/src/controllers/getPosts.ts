import { Request, Response } from "express";
import { User } from "../database/models/user";

export default async function getPosts(req: Request, res: Response) {
  req.body;
  const { posts } = new User();
  return res.json(posts);
}
