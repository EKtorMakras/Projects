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
