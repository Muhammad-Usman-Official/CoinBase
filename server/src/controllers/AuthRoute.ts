import userVerification from "../middlewares/authMiddleWare";
import signup from "./signup";
const router = require("express").Router();

router.post("/signup", signup);
router.post("/", userVerification);

export default router;
