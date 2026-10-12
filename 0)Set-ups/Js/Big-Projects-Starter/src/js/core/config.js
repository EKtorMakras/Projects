/** Values from .env files (VITE_*), with fallbacks so a fresh clone works without .env.local. */
export const config = {
  APP_NAME: import.meta.env.VITE_APP_NAME || "Project",
};
