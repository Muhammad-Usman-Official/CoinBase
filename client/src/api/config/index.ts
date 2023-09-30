const BACKEND_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
const NEWS_API_KEY = "7146786b31df32545b59c97de0c2207b";

export { homeUri, NEWS_API_KEY };
