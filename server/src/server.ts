if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: __dirname + "/.env" });
}

import express from "express";
// import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes";
import dbConnect from "./database";
import errorHandler from "./middlewares/errorHandler";
import { TUserDto } from "./types/types";
import { staticFilesOptions } from "./utils";
import { FRONT_END_URL_PATH, PORT } from "./config";
import path from "path";

// Express App
const app = express();

// CORS
app.use(
  cors({
    origin: FRONT_END_URL_PATH,
    credentials: true,
    methods: ["POST", "PUT", "DELETE", "GET"],
  })
);

// Serve JSON FILES middleware
app.use(
  express.json({
    limit: "50mb",
  })
);

// FOR MANIPULATING COOKIES
app.use(cookieParser());

// EXTENDING Request object of EXPRESS
declare global {
  namespace Express {
    interface Request {
      user?: TUserDto; // make the user property optional
    }
  }
}

// serve static files like images
app.use("/public", express.static("src/public", staticFilesOptions));

// ROUTES HANDLER MIDDLEWARE
app.use(router);

// DB CONNECTION
(async () => {
  await dbConnect()
    .then(() => {
      app.listen(PORT);
      console.log(`Server is listening on port ${PORT}`);
    })
    .catch((err) => {
      console.error("DATABASE ERROR!!!!!! " + err);
    });
})();

// MIDDLEWARE FOR ERROR HANDLING
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client", "dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}
