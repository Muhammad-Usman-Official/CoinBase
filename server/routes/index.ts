import express from "express";
import getAllBlogsController from "../controllers/getAllBlogsController";
import authController from "../controllers/authController";
import auth from "../middlewares/auth";
import createBlogController from "../controllers/createBlogController";
import getBlogByIdController from "../controllers/getBlogByIdController";
import updateBlogController from "../controllers/updateBlogController";
import deleteBlogController from "../controllers/deleteBlogController";
import createCommentController from "../controllers/createCommentController";
import getCommentByIdController from "../controllers/getCommentByIdController";

const router = express.Router();

// TEST
router.get("/", (_, res) => {
  res.send("Home route working!");
  res.end();
});

// POST - SIGNUP - CREATE AN ACCOUNT
router.post("/register", authController.register);
// POST - LOGIN THE USER
router.post("/login", authController.login);
// POST - LOGOUT THE USER
router.post("/logout", auth, authController.logout);
// GET - REFRESH TOKEN
router.get("/refresh", authController.refresh);
// POST - CREATE NEW BLOG
router.post("/blog", auth, createBlogController);
// GET - FETCH ALL THE BLOGS FROM THE DB
router.get("/blog/all", auth, getAllBlogsController);
// GET - FETCH SINGLE BLOG BY BLOG_ID
router.get("/blog/:blogId", auth, getBlogByIdController);
// PUT - UPDATE THE BLOG
router.put("/blog", updateBlogController);
// DELETE - REMOVE A BLOG FROM THE DB by using id of the blog
router.delete("/blog/:blogId", deleteBlogController);

// comments:
// create
router.post("/comment", auth, createCommentController);
// get
router.get("/comment/:blogId", auth, getCommentByIdController);
export default router;
