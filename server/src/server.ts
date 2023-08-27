import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes";
import dbConnect from "./database";
import errorHandler from "./middlewares/errorHandler";
import { TUserDto } from "./types/types";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(cookieParser());

declare global {
  namespace Express {
    interface Request {
      user?: TUserDto; // make the user property optional
    }
  }
}

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

app.use(express.json());
app.use(router);
app.use(errorHandler);
