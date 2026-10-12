/** The app's console logger; importing it also logs uncaught errors and unhandled promise rejections. */
import { createLogger } from "@emakras/vanilla-kit";
import { config } from "./config.js";

export const log = createLogger(config.APP_NAME, { catchErrors: true });
