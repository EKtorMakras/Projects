import dayjs from "@/includes/dayjs.js";

export function formatTime(timeSeconds = 0) {
  return dayjs.duration(Math.max(0, timeSeconds), "seconds").format("mm:ss");
}
