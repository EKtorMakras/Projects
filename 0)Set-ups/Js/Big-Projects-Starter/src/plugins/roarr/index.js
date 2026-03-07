import { ROARR, Roarr } from "roarr";
import { createConsoleWriter } from "./consoleWriter";
import { AppName } from "@/data";

export const log = Roarr.child({ app: AppName });

// Set the writer directly
ROARR.write = createConsoleWriter();

// Log uncaught errors
window.addEventListener("error", function (event) {
  log.error(`${event.message} @ ${event.filename}:${event.lineno}:${event.colno}`);
});
