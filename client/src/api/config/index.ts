import process from "process";

const BACKEND_BASE_URL = process.env.VITE_API_BASE_URL as string;
const NEWS_API_KEY = process.env.VITE_NEWS_API_KEY as string;

let homeUri: string;

const development: boolean =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";
if (development) {
  homeUri = "http://localhost:3000";
} else {
  homeUri = BACKEND_BASE_URL as string;
}

export { homeUri, NEWS_API_KEY };
