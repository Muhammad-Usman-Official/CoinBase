const BACKEND_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
console.log("news api key: ", NEWS_API_KEY);
let homeUri: string;

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
