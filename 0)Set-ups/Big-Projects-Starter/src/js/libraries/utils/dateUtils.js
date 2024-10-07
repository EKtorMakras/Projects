import { padTo2Digits } from "./numberUtils";

// ================== Dates ================== //
export function getNextDay(i, length = 7) {
  if (typeof i !== "number" || isNaN(i)) {
    throw new Error("getNextDay: The first argument must be a number representing the number of days to skip.");
  }

  if (typeof length !== "number" || isNaN(length) || length < 1) {
    throw new Error("getNextDay: The second argument must be a positive number representing the length of the week.");
  }

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const nextDayNumber = new Date().getDay() + 1;
  const nextDay = days[(nextDayNumber + i) % length];

  return nextDay;
}

export function formatDate(date = new Date()) {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("formatDate: Input must be a valid Date object.");
  }

  return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join("-");
}

export function formatRelativeDate(toDate, fromDate = new Date(), locale) {
  if (!(toDate instanceof Date) || isNaN(toDate)) {
    throw new Error("formatRelativeDate: The first argument must be a valid Date object representing the target date.");
  }

  if (!(fromDate instanceof Date) || isNaN(fromDate)) {
    throw new Error("formatRelativeDate: The second argument must be a valid Date object representing the base date.");
  }

  if (typeof locale !== "string") {
    throw new Error("formatRelativeDate: Locale must be a string representing a valid locale.");
  }

  const DIVISIONS = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
  ];

  const RELATIVE_DATE_FORMATTER = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
  });

  let duration = (toDate - fromDate) / 1000;

  for (let i = 0; i <= DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return RELATIVE_DATE_FORMATTER.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
}
