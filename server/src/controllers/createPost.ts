import { Request, Response } from "express";
import { User } from "../database/models/user";

export default async function createPost(req: Request, res: Response) {
  const { title, body } = req.body;
  const newPost = new User({
    posts: [
      {
        title: title,
        body: body,
      },
    ],
  });
  const post = await newPost.save();
  console.log(post);
  return res.json(post);
}
