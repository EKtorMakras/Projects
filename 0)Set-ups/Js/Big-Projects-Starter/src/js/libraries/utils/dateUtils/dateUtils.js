import dayjs from "@/plugins/dayjs";

// ======================= Get Next Day ======================= //
/**
 * Returns the abbreviation of the day that comes i days after tomorrow.
 *
 * @param {number} i - Number of days to skip after tomorrow.
 * @param {number} [length=7] - The total number of days in the cycle (default is 7).
 * @returns {string} - The uppercase abbreviation of the resulting day (e.g. "MON").
 *
 * @throws {Error} If the arguments are not valid numbers.
 *
 * @example
 * getNextDay(0); // Returns "TUE" if today is Sunday
 * getNextDay(2); // Returns "THU" if today is Sunday
 */
export function getNextDay(i, length = 7) {
  if (typeof i !== "number" || isNaN(i)) {
    throw new Error("getNextDay: The first argument must be a number.");
  }

  if (typeof length !== "number" || isNaN(length) || length < 1) {
    throw new Error("getNextDay: The second argument must be a positive number.");
  }

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const nextDayIndex = (dayjs().day() + 1 + i) % length;
  return days[nextDayIndex];
}

// ======================= Format Date ======================= //
/**
 * Formats a Date object into "YYYY-MM-DD" format.
 *
 * @param {Date} [date=new Date()] - The date to format.
 * @returns {string} - Formatted date string in "YYYY-MM-DD" format.
 *
 * @throws {Error} If the input is not a valid Date object.
 *
 * @example
 * formatDate(new Date("2025-04-12")); // Returns "2025-04-12"
 * formatDate(); // Returns today's date in "YYYY-MM-DD"
 */
export function formatDate(date = new Date()) {
  const d = dayjs(date);
  if (!d.isValid()) throw new Error("formatDate: Invalid Date object.");
  return d.format("YYYY-MM-DD");
}

// ======================= Format Relative Date ======================= //
/**
 * Returns a human-readable relative time string between two dates.
 *
 * @param {Date} toDate - The target date to compare.
 * @param {Date} [fromDate=new Date()] - The base date to compare from.
 * @param {string} [locale="en"] - Locale code for formatting (e.g. "en", "fr").
 * @returns {string} - A localized string like "in 3 days" or "2 weeks ago".
 *
 * @throws {Error} If any of the dates are invalid or if locale is not a string.
 *
 * @example
 * formatRelativeDate(new Date("2025-04-15")); // Returns "in 3 days"
 * formatRelativeDate(new Date("2025-04-10"), new Date("2025-04-12")); // Returns "2 days ago"
 */
export function formatRelativeDate(toDate, fromDate = new Date(), locale = "en") {
  const to = dayjs(toDate);
  const from = dayjs(fromDate);

  if (!to.isValid() || !from.isValid()) {
    throw new Error("formatRelativeDate: Invalid Date object(s).");
  }

  // Optional: load locale dynamically if you support multiple
  // await import(`dayjs/locale/${locale}`); // if using async + dynamic import
  dayjs.locale(locale);

  return to.from(from);
}

// ======================= Is Same Day ======================= //
/**
 * Checks if two dates fall on the same calendar day.
 *
 * @param {Date} date1 - First date to compare.
 * @param {Date} date2 - Second date to compare.
 * @returns {boolean} - True if both dates are on the same day.
 *
 * @example
 * isSameDay(new Date("2025-04-12"), new Date("2025-04-12")); // true
 * isSameDay(new Date("2025-04-12"), new Date("2025-04-13")); // false
 */
export function isSameDay(date1, date2) {
  return dayjs(date1).isSame(dayjs(date2), "day");
}

// ======================= Get Start of Week ======================= //
/**
 * Returns the start of the week for the given date.
 *
 * @param {Date} [date=new Date()] - The date to find the week start from.
 * @param {number} [weekStart=0] - The first day of the week (0 = Sunday, 1 = Monday, etc.).
 * @returns {Date} - A Date object representing the start of the week.
 *
 * @example
 * getStartOfWeek(new Date("2025-04-10")); // Returns the Sunday or Monday of that week
 */
export function getStartOfWeek(date = new Date(), weekStart = 0) {
  const d = dayjs(date);
  const diff = (d.day() - weekStart + 7) % 7;
  return d.subtract(diff, "day").startOf("day").toDate();
}

// ======================= Add Days ======================= //
/**
 * Returns a new Date object with the specified number of days added.
 *
 * @param {Date} date - The base date.
 * @param {number} days - Number of days to add (use negative to subtract).
 * @returns {Date} - A new Date object with the days added.
 *
 * @example
 * addDays(new Date("2025-04-10"), 3); // Returns "2025-04-13"
 */
export function addDays(date, days) {
  return dayjs(date).add(days, "day").toDate();
}
