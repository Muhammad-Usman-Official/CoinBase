import { Request, Response, NextFunction } from "express";
import Blog from "../database/models/blog";
import Joi from "joi";
import { mongoIdPattern } from "../utils";
import { TBlog } from "../types";
import { unlinkSync, writeFileSync } from "fs";
import { BACKEND_SERVER_PATH } from "../config";
import path from "path";
import { currDate } from "./createBlogController";

export default async function updateBlogController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const updateBlogSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    photo: Joi.string(),
    blogId: Joi.string().regex(mongoIdPattern).required(),
    author: Joi.string().regex(mongoIdPattern).required(),
  });

  const { error } = updateBlogSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  const { blogId, title, content, photo, author } = req.body;

  let blog: TBlog | null;
  try {
    blog = await Blog.findOne({ _id: blogId });
  } catch (err) {
    return next(err);
  }

  if (photo) {
    try {
      if (!blog) return;
      const prevPhoto = blog.photoPath;
      const prevPhotoPath = prevPhoto.split("/").at(-1);
      unlinkSync(path.join(__dirname, `storage/${prevPhotoPath}.png`));
    } catch (err) {
      return next(err);
    }
    const buffer = Buffer.from(
      photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );

    const imageName = `${currDate}-${author}`;
    try {
      const pathToStoreImage = `storage/${imageName}.png`;
      writeFileSync(pathToStoreImage, buffer);
    } catch (err) {
      return next(err);
    }
    await Blog.updateOne(
      {
        _id: blogId,
      },
      {
        photoPath: `${BACKEND_SERVER_PATH}/storage/${imageName}`,
      }
    );
  } else {
    await Blog.updateOne(
      { _id: blogId },
      {
        title,
        content,
      }
    );
  }

  res.status(200).json({ messsage: "blog updated" });
}
