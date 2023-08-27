import express from "express";
import getUsers from "../controllers/getUsers";
import authController from "../controllers/authController";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/", getUsers);
// POST - SIGNUP - CREATE AN ACCOUNT
router.post("/register", authController.register);
// POST - LOGIN THE USER
router.post("/login", authController.login);
// POST - LOGOUT THE USER
router.post("logout", auth);
router.post("/logout", authController.logout);
// GET - REFRESH TOKEN
router.get("/refresh", authController.refresh);
// router.get("/posts", getPosts);
// POST CREATE A NEW POST
// router.post("/createPost", createPost);

export default router;
