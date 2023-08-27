import * as jwt from "jsonwebtoken";
import "dotenv/config";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, PORT, MONGO_URL } =
  process.env;

export { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, PORT, MONGO_URL };
