import process from "process";
const BACKEND_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let homeUri: string;

/* if (
  !import.meta.env.VITE_NODE_ENV ||
  import.meta.env.VITE_NODE_ENV === "development"
) {
  homeUri = "http://localhost:3000";
} else {
  homeUri = BACKEND_BASE_URL;
} */

const development: boolean =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";
if (development) {
  homeUri = "http://localhost:3000";
} else {
  homeUri = BACKEND_BASE_URL;
}

export { homeUri };
