const BACKEND_BASE_URL = import.meta.env.API_BASE_URL as string;
const NEWS_API_KEY = import.meta.env.NEWS_API_KEY as string;

let homeUri: string;

const development: boolean =
  !import.meta.env.NODE_ENV || import.meta.env.NODE_ENV === "development";
if (development) {
  homeUri = "http://localhost:3000";
} else {
  homeUri = BACKEND_BASE_URL as string;
}

export { homeUri, NEWS_API_KEY };
