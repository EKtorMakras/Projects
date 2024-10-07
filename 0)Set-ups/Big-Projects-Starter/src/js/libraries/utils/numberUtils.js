// ================== Numbers ================== //
export function padTo2Digits(num) {
  if (typeof num !== "number" || isNaN(num)) {
    throw new Error("padTo2Digits: Input must be a number.");
  }

  return num.toString().padStart(2, "0");
}

export function formatDecimals(num, digits = 2) {
  if (typeof num !== "number" || isNaN(num)) {
    throw new Error("formatDecimals: Input must be a number.");
  }

  if (Number.isInteger(num)) {
    // Check if the number is an integer (no decimal part)
    return num.toString(); // Return the integer as a string
  } else {
    return num.toFixed(digits); // Format with corresponding decimal places
  }
}

export function randomNumberBetween(min, max) {
  if (typeof min !== "number" || isNaN(min) || typeof max !== "number" || isNaN(max)) {
    throw new Error("randomNumberBetween: Both arguments must be numbers.");
  }

  if (min > max) {
    throw new Error(
      "randomNumberBetween: The first argument (min) must be less than or equal to the second argument (max)."
    );
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function numberIsEven(number) {
  if (typeof number !== "number" || isNaN(number)) {
    throw new Error("numberIsEven: Input must be a number.");
  }

  return number % 2 === 0;
}

export function getAverage(...nums) {
  if (nums.length === 0) {
    throw new Error("getAverage: At least one number must be provided.");
  }

  const sum = nums.reduce((a, b) => a + b, 0);
  return sum / nums.length;
}

export function formatNumber(number, notation, locale) {
  if (typeof number !== "number" || isNaN(number)) {
    throw new Error("formatNumber: Input must be a number.");
  }

  if (typeof notation !== "string" || (notation !== "compact" && notation !== "scientific")) {
    throw new Error("formatNumber: Notation must be either 'compact' or 'scientific'.");
  }

  if (typeof locale !== "string") {
    throw new Error("formatNumber: Locale must be a string representing a valid locale.");
  }

  const NUMBER_FORMATTER = new Intl.NumberFormat(locale, {
    notation,
  });

  return NUMBER_FORMATTER.format(number);
}

export function formatCurrency(number, currency = "USD", locale = "en-US") {
  if (typeof number !== "number" || isNaN(number)) {
    throw new Error("formatCurrency: Input must be a number.");
  }

  if (typeof currency !== "string") {
    throw new Error("formatCurrency: Currency must be a string representing a valid currency code.");
  }

  if (typeof locale !== "string") {
    throw new Error("formatCurrency: Locale must be a string representing a valid locale.");
  }

  const CURRENCY_FORMATTER = new Intl.NumberFormat(locale, {
    currency: currency,
    style: "currency",
  });

  return CURRENCY_FORMATTER.format(number);
}
