import { initTheme, toggleTheme } from "./theme.js";
import { AppName } from "@/data";

document.title = AppName;
initTheme();

document.getElementById("theme-btn")?.addEventListener("click", toggleTheme);
