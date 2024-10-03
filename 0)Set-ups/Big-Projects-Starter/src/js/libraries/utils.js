import { config } from "@/common/config";

// ================== Strings ================== //
export function toProperCase(str) {
  if (typeof str !== "string") {
    throw new Error("toProperCase: Input must be a string.");
  }

  if (str.length === 0) {
    return str; // Return an empty string
  }

  return str[0].toUpperCase() + str.substring(1).toLowerCase();
}

export function cleanUppercaseText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .normalize("NFC");
}

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

// ================== Colors ================== //
// General
export function getColor(colorName) {
  const color = `var(--clr-${colorName})`;
  return color;
}

// Conversions
export function rgbToHex(rgb) {
  rgb = rgb.toLowerCase();

  // Check if the input is a string and has a valid format
  if (!isValidRgbString(rgb)) {
    console.warn(`rgbToHex: The input ${rgb} is not a valid RGB or RGBA string.`);
    return null;
  }

  // Determine the separator used in the input string (either a comma or a space)
  let sep = rgb.indexOf(",") > -1 ? "," : " ";

  // Check if the input string is an RGBA color
  let isRgba = rgb.indexOf("rgba") > -1;

  // Remove the "rgb(" or "rgba(" prefix and the ")" suffix, and split the string into an array of values
  rgb = rgb
    .substring(isRgba ? 5 : 4)
    .split(")")[0]
    .split(sep);

  // Convert the red, green, and blue values to hexadecimal
  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  // If the input string is an RGBA color, convert the alpha value to hexadecimal
  // If the alpha value is 1 or not specified, set it to null
  let a = isRgba && rgb[3] && rgb[3] !== "1" ? Math.round(+rgb[3] * 255).toString(16) : null;

  // If any of the hexadecimal values are only one digit, prepend a zero
  r = r.padStart(2, "0");
  g = g.padStart(2, "0");
  b = b.padStart(2, "0");
  if (a) a = a.padStart(2, "0");

  // Combine the hexadecimal values into a single string and return it
  return "#" + r + g + b + (a ? a : "");
}

export function hexToRgba(hex) {
  console.log(hex);
  if (!isValidHex(hex)) {
    console.warn(`hexToRgba: The input ${hex} is not a valid hexadecimal color.`);
    return null;
  }

  // Remove the '#' symbol
  hex = hex.slice(1);

  // Handle shorthand HEX notation (3 or 4 characters)
  hex = expandShorthandHex(hex);

  // Separate the color components
  const hasAlpha = hex.length === 8;
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const a = hasAlpha ? parseInt(hex.substr(6, 2), 16) / 255 : 1;

  // Check if the parsed values are valid
  if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
    console.warn(`hexToRgba: Failed to parse the color components from the input ${hex}.`);
    return null;
  }

  // Construct the final RGBA color string
  let rgbaColor = `rgba(${r}, ${g}, ${b}`;

  if (a !== 1) {
    rgbaColor += `, ${a}`;
  }

  rgbaColor += ")";

  return rgbaColor;
}

// Adjustments
export function adjustColor(color, percent, mode) {
  // Validate percent
  if (typeof percent !== "number" || percent < 0 || percent > 100) {
    console.warn(
      `adjustColor: The percentage argument ${percent} is not valid. Please provide a number between 0 and 100.`
    );
    return color;
  }

  // Validate mode
  if (mode !== "darken" && mode !== "lighten") {
    console.warn(`adjustColor: The mode argument ${mode} is not valid. Please provide either 'darken' or 'lighten'.`);
    return color;
  }

  const adjustmentAmount = percent / 100;
  let colorToProcess = color;
  let rgbaColor;
  let isRGBA = false;
  let opacity = 1;

  const colorLowerCase = colorToProcess.toLowerCase();

  // Handle RGB colors
  if (colorLowerCase.startsWith("rgb")) {
    rgbaColor = colorToProcess;
    isRGBA = true;
  }

  // Handle HEX colors
  else {
    if (colorToProcess.startsWith("#")) {
      colorToProcess = colorToProcess.slice(1);
    }

    // Handle short hex notation
    colorToProcess = expandShorthandHex(colorToProcess);

    // Check for opacity in HEX format (e.g., RRGGBBAA)
    if (colorToProcess.length === 8) {
      const alphaHex = colorToProcess.slice(-2);
      opacity = parseInt(alphaHex, 16) / 255;
      colorToProcess = colorToProcess.slice(0, -2);
    } else if (colorToProcess.length !== 6) {
      console.warn(`adjustColor: The color ${color} is not a valid hexadecimal color.`);
      return color;
    }

    // Convert HEX to RGBA
    rgbaColor = hexToRgba(`#${colorToProcess}`);

    if (rgbaColor === null) {
      console.warn(`adjustColor: The color ${color} is not a valid hexadecimal color.`);
      return color;
    }
  }

  // Parse RGBA components
  const rgba = parseRgbString(rgbaColor);

  if (!rgba) {
    console.warn(`adjustColor: Failed to parse the color ${rgbaColor}.`);
    return color;
  }

  let { r, g, b, a } = rgba;
  a = isRGBA ? a : opacity;

  // Adjust the color components
  const adjustValue = (value) => Math.min(Math.max(value, 0), 255);
  let adjustedR, adjustedG, adjustedB;

  if (mode === "darken") {
    adjustedR = adjustValue(Math.round(r - r * adjustmentAmount));
    adjustedG = adjustValue(Math.round(g - g * adjustmentAmount));
    adjustedB = adjustValue(Math.round(b - b * adjustmentAmount));
  } else if (mode === "lighten") {
    adjustedR = adjustValue(Math.round(r + (255 - r) * adjustmentAmount));
    adjustedG = adjustValue(Math.round(g + (255 - g) * adjustmentAmount));
    adjustedB = adjustValue(Math.round(b + (255 - b) * adjustmentAmount));
  }

  // Construct the adjusted color string
  const adjustedColorString =
    a === 1 ? `rgb(${adjustedR}, ${adjustedG}, ${adjustedB})` : `rgba(${adjustedR}, ${adjustedG}, ${adjustedB}, ${a})`;

  // If the original color was RGBA, return the RGB/RGBA string; otherwise, convert it to HEX
  let adjustedColor;

  if (isRGBA) {
    adjustedColor = adjustedColorString;
  } else {
    adjustedColor = rgbToHex(adjustedColorString);

    if (!adjustedColor) {
      console.warn(
        `adjustColor: Unable to convert the adjusted color (${adjustedR}, ${adjustedG}, ${adjustedB}, ${a}) to hexadecimal format.`
      );
      return color;
    }
  }

  return adjustedColor;
}

export function adjustColors(colors, percent, mode = "darken") {
  // Check if the colors argument is an array
  if (!Array.isArray(colors)) {
    // If the colors argument is a string, convert it to an array
    if (typeof colors === "string") {
      colors = [colors];
    } else {
      // Return null if colors is neither an array nor a string
      console.error("The colors argument must be an array or a string.");
      return null;
    }
  }

  // Validate the percent argument
  if (typeof percent !== "number" || percent <= 0 || percent > 100) {
    console.error(
      `The percentage argument ${percent} is not a valid number. Please provide a number between 0 and 100.`
    );
    return null;
  }

  // Validate the mode argument
  if (mode !== "darken" && mode !== "lighten") {
    console.error(`The mode argument ${mode} is not valid. Please provide either 'darken' or 'lighten'.`);
    return null;
  }

  // Adjust each color in the array
  const adjustedColors = colors.map((color) => {
    if (mode === "darken") {
      return darkenColor(color, percent);
    } else {
      return lightenColor(color, percent);
    }
  });

  return adjustedColors;
}

export function lightenColor(color, percent) {
  return adjustColor(color, percent, "lighten");
}

export function darkenColor(color, percent) {
  return adjustColor(color, percent, "darken");
}

// Helpers
function isValidRgbString(rgb) {
  const rgbRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/;
  if (typeof rgb !== "string") return false;
  const match = rgb.match(rgbRegex);
  if (!match) return false;

  const r = Number(match[1]);
  const g = Number(match[2]);
  const b = Number(match[3]);
  const a = match[4] !== undefined ? Number(match[4]) : 1;

  // Check if RGB components are within 0-255 and alpha is within 0-1
  return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255 && a >= 0 && a <= 1;
}

function isValidHex(hex) {
  if (typeof hex !== "string") return false;

  // Check if the input starts with "#"
  if (!hex.startsWith("#")) return false;

  // Remove the '#' symbol for further validation
  const hexWithoutHash = hex.slice(1);

  // Handle shorthand HEX notation (3 or 4 characters)
  const expandedHex = expandShorthandHex(hexWithoutHash);

  // Validate the expanded HEX length (6 for RGB or 8 for RGBA)
  return /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(expandedHex);
}

function parseRgbString(rgbString) {
  // Check if the argument is a string
  if (typeof rgbString !== "string") {
    console.warn(`parseRgbString: The input ${rgbString} is not a valid string.`);
    return null;
  }

  // Match the RGB(A) values in the string
  const rgbaValues = rgbString.match(/[\d.]+/g);

  // Check if the values are valid
  if (!rgbaValues || rgbaValues.length < 3) {
    console.warn(`parseRgbString: The input ${rgbString} does not contain valid RGB or RGBA values.`);
    return null;
  }

  // Parse the red, green, blue, and optional alpha components
  const r = parseInt(rgbaValues[0]);
  const g = parseInt(rgbaValues[1]);
  const b = parseInt(rgbaValues[2]);
  const a = rgbaValues[3] !== undefined ? parseFloat(rgbaValues[3]) : 1;

  // Check if the parsed values are valid
  if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
    console.warn(`parseRgbString: Failed to parse the color components from the input ${rgbString}.`);
    return null;
  }

  return { r, g, b, a };
}

function expandShorthandHex(hex) {
  if (hex.length === 3 || hex.length === 4) {
    return hex
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }

  return hex;
}

// ================== Arrays ================== //
export function arrFirst(arr, n = 1) {
  // Directly return the first element if n is 1
  if (n === 1) return arr[0];
  // Use slice to get the first n elements efficiently
  return arr.slice(0, n);
}

export function arrLast(arr, n = 1) {
  // Directly return the last element if n is 1
  if (n === 1) return arr[arr.length - 1];
  // Use slice with a negative start index to get the last n elements efficiently
  return arr.slice(-n);
}

export function arrRandom(arr) {
  return arr[randomNumberBetween(0, arr.length - 1)];
}

export function arrGetUniqueObjectValues(arr, value) {
  return [
    ...new Set(
      arr.map((item) => {
        return item[value];
      })
    ),
  ];
}

export function arrGroupBy(arr, key) {
  return arr.reduce((group, element) => {
    const keyValue = element[key];

    return {
      ...group,
      [keyValue]: [...(group[keyValue] ?? []), element],
    };
  }, {});
}

export function arrIsNotEmpty(arr) {
  return Array.isArray(arr) && arr.length > 0;
}

export function arrShuffle(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

export function arrFindMinMaxByKey(arr, key) {
  if (arr.length === 0) {
    return { min: undefined, max: undefined };
  }

  let min = arr[0][key];
  let max = arr[0][key];

  arr.forEach((element) => {
    const value = element[key];
    if (value < min) min = value;
    if (value > max) max = value;
  });

  return { min, max };
}

// ================== DOM ================== //
// Global Event Listener
export function addGlobalEventListener(type = "click", selector, callback, parent = document, options) {
  parent.addEventListener(
    type,
    (e) => {
      if (e.target.matches(selector)) callback(e);
    },
    options
  );
}

// Get Dom Element //
export function getDomElement(selection, multiple = false, parent = document) {
  let element;

  if (multiple) {
    element = [...parent.querySelectorAll(selection)];
  } else {
    element = parent.querySelector(selection);
  }

  if (element) {
    return element;
  }

  throw new Error("no element selected");
}

// Create Element  //
export function createHtmlElement(htmlString) {
  const template = document.createElement("template");
  htmlString = htmlString.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = htmlString;

  return template.content.firstElementChild;
}

export function createElement(options = {}, type = "div") {
  const element = document.createElement(type);

  Object.entries(options).forEach(([key, value]) => {
    if (key === "class") {
      element.classList.add(value);
      return;
    }

    if (key === "dataset") {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
      return;
    }

    if (key === "text") {
      element.textContent = value;
      return;
    }

    element.setAttribute(key, value);
  });
  return element;
}

// Delete All Child Elements  //
export function deleteChildElements(parentElement) {
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
}

// ================== Local Storage ================== //
export function getItemLs(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setItemLs(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

export function updateItemLs(key, property, value) {
  const obj = getItemLs(key);

  if (obj) {
    obj[property] = value;
    setItemLs(key, obj);
  } else {
    setItemLs(key, {
      [property]: value,
    });
  }
}

// ================== Fetch ================== //
export function timeout(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}

export async function getJSON(url) {
  try {
    const response = await Promise.race([fetch(url), timeout(config.TIMEOUT_SECONDS)]);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${data?.message} (${response?.status})`);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

// ================== Other ================== //
export function sanitizeInput(inputValue) {
  const div = document.createElement("div");
  div.textContent = inputValue;
  return div.innerHTML;
}

export function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

// Get parameters by name from url
export function getParameterValue(paramName, url = window.location.href) {
  if (!url) url = window.location.href;
  const regex = new RegExp(`[?&]${paramName}(=([^&#]*))`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
