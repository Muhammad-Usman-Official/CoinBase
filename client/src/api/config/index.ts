const BACKEND_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// BACKEND SERVER ADDRESS
let homeUri: string;

// IS ENVIRONMENT DEVELOPMENT OR PRODUCTION
const development: boolean =
  !import.meta.env.VITE_NODE_ENV ||
  import.meta.env.DEV ||
  import.meta.env.VITE_NODE_ENV === "development";

if (development) {
  homeUri = "http://localhost:3000";
} else {
  homeUri = BACKEND_BASE_URL;
}

export { homeUri, NEWS_API_KEY };
