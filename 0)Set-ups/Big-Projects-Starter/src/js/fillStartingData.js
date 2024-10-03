import { AppName } from "./data";

export function initStartingData() {
  fillBasicData();
}

function fillBasicData() {
  document.title = AppName;
}
