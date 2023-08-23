import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import AuthRoute from "./controllers/AuthRoute";
import router from "./routes";
import dbConnect from "./database";

const app = express();

dbConnect();

app.use(router);
app.use(express.json());
app.use(cookieParser());
app.use("/", AuthRoute);
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
