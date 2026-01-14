import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";

// Configure dayjs with duration plugin once
dayjs.extend(duration);

export default dayjs;
