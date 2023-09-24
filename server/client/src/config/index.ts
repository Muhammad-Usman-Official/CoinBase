const BACKEND_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const homeUri = BACKEND_BASE_URL || "http://localhost:3000";

export { homeUri };