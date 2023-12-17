import { AppName} from "./data.js";
import { dom } from "./DOM.js";

export function initStartingData() {
  fillBasicData();
}

function fillBasicData() {
  document.title = AppName;
}