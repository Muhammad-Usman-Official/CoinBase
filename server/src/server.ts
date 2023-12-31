if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  require("dotenv/config");
}

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index";
import dbConnect from "./database/index";
import errorHandler from "./middlewares/errorHandler";
import { TUserDto } from "./types/index";
import { staticFilesOptions } from "./utils/index";
import { FRONT_END_URL_PATH, PORT } from "./config/index";

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
app.use("/storage", express.static("storage", staticFilesOptions));

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
      console.error("DATABASE ERROR! ->" + err);
    });
})();

// MIDDLEWARE FOR ERROR HANDLING
app.use(errorHandler);
