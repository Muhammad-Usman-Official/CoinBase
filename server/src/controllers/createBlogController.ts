import { Request, Response, NextFunction } from "express";
import Blog from "../database/models/blog";
import Joi from "joi";
import fs from "fs";
import { BACKEND_SERVER_PATH } from "../config";
import BlogDTO from "../dto/blog";
import { mongoIdPattern } from "../utils/index";
import { TCreateBlog } from "../types";

export const currDate = new Date(Date.now())
  .toDateString()
  .replaceAll(" ", "-");

export default async function createBlogController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  /*
   * validate req body
   * handle photo storage, naming
   * add to db
   * return response
   */

  const createBlogSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().regex(mongoIdPattern).required(),
    content: Joi.string().required(),
    /* photo process: client side -> base64 encoded string ->
     * decode -> store -> save path of image in db
     */
    photo: Joi.string().required(),
  });

  const { error } = createBlogSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  const { title, photo, content, author } = req.body;
  /*
   * read as buffer
   * allot a random name
   * save locally
   */
  const buffer = Buffer.from(
    photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
    "base64"
  );

  const imageName = `${currDate}_${author}`;
  try {
    const pathToStoreImage = `storage/${imageName}.png`;
    fs.writeFileSync(pathToStoreImage, buffer);
  } catch (err) {
    return next(err);
  }

  let newBlog;
  try {
    newBlog = new Blog({
      title,
      author,
      content,
      photoPath: `${BACKEND_SERVER_PATH}/storage/${imageName}`,
    });
  } catch (err) {
    return next(err);
  }
  const blog = await newBlog.save();
  const blogDto: TCreateBlog = new BlogDTO(blog);
  return res.status(201).json({ blog: blogDto });
}
