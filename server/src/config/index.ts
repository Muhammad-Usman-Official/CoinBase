if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  require("dotenv/config");
}

const {
  ACCESS_TOKEN_SECRET,
  BACKEND_SERVER_BASE_URL,
  FRONT_END_BASE_URL,
  REFRESH_TOKEN_SECRET,
  MONGO_URL,
} = process.env;

let FRONT_END_URL_PATH: string, BACKEND_SERVER_PATH: string;
const PORT = process.env.PORT ?? 3000;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  FRONT_END_URL_PATH = "http://localhost:5173";
  BACKEND_SERVER_PATH = `http://localhost:${PORT}`;
} else {
  FRONT_END_URL_PATH = FRONT_END_BASE_URL as string;
  BACKEND_SERVER_PATH = BACKEND_SERVER_BASE_URL as string;
}

export {
  ACCESS_TOKEN_SECRET,
  BACKEND_SERVER_PATH,
  REFRESH_TOKEN_SECRET,
  MONGO_URL,
  PORT,
  FRONT_END_URL_PATH,
};
