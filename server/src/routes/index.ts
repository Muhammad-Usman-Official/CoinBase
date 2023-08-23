import express from "express";
import getUsers from "../controllers/getUsers";
import signup from "../controllers/signup";
import login from "../controllers/login";
import getPosts from "../controllers/getPosts";
import createPost from "../controllers/createPost";

const router = express.Router();

router.get("/", getUsers);
// POST SIGNUP - CREATE AN ACCOUNT
router.post("/signup", signup);
// POST LOGIN
router.post("/login", login);
// GET FETCH POSTS
router.get("/posts", getPosts);
// POST CREATE A NEW POST
router.post("/createPost", createPost);

export default router;
