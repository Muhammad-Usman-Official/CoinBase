if (process.env.CYCLIC_ENV !== "production") {
  require("dotenv/config");
}

const {
  ACCESS_TOKEN_SECRET,
  BACKEND_SERVER_BASE_URL,
  FRONT_END_BASE_URL,
  REFRESH_TOKEN_SECRET,
  MONGO_URL,
} = process.env;

const FRONT_END_URL_PATH = FRONT_END_BASE_URL ?? "http://localhost:3000";
const PORT = process.env.PORT ?? 3000;
const BACKEND_SERVER_PATH =
  BACKEND_SERVER_BASE_URL ?? `http://localhost:${PORT}`;

export {
  ACCESS_TOKEN_SECRET,
  BACKEND_SERVER_PATH,
  REFRESH_TOKEN_SECRET,
  MONGO_URL,
  PORT,
  FRONT_END_URL_PATH,
};
