// ======================= Add Global Event Listener ======================= //
/**
 * Adds a delegated event listener to a parent element that listens for events on matching child selectors.
 *
 * @param {string} [type="click"] - The type of event to listen for (e.g., "click", "input").
 * @param {string} selector - CSS selector to match the target elements.
 * @param {Function} callback - The function to call when the event is triggered.
 * @param {Element|Document} [parent=document] - The parent element to attach the event listener to.
 * @param {Object} [options] - Optional event listener options (e.g., { capture: true }).
 *
 * @example
 * addGlobalEventListener("click", ".btn", (e) => console.log(e.target));
 */
export function addGlobalEventListener(type = "click", selector, callback, parent = document, options) {
  parent.addEventListener(
    type,
    (e) => {
      if (e.target.matches(selector)) callback(e);
    },
    options
  );
}

// ======================= Get DOM Element ======================= //
/**
 * Returns a single or multiple DOM elements based on the provided selector.
 *
 * @param {string} selection - CSS selector to query the DOM.
 * @param {boolean} [multiple=false] - If true, returns an array of matching elements.
 * @param {Element|Document} [parent=document] - The parent node to search within.
 * @returns {Element|Element[]} - The matched element(s).
 *
 * @throws {Error} If no element is found.
 *
 * @example
 * getDomElement("#header"); // Returns the header element
 * getDomElement(".card", true); // Returns all elements with class "card"
 */
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

// ======================= Create HTML Element ======================= //
/**
 * Creates a DOM element from an HTML string.
 *
 * @param {string} htmlString - A string of valid HTML (must include a root element).
 * @returns {Element} - The created DOM element.
 *
 * @example
 * createHtmlElement('<div class="box">Hello</div>'); // Returns a <div> element with class "box"
 */
export function createHtmlElement(htmlString) {
  const template = document.createElement("template");
  htmlString = htmlString.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = htmlString;

  return template.content.firstElementChild;
}

// ======================= Create Element with Options ======================= //
/**
 * Creates a DOM element with attributes, text content, dataset, and class.
 *
 * @param {Object} [options={}] - Configuration for the element.
 * @param {string} [type="div"] - The HTML tag to create.
 * @returns {Element} - The configured DOM element.
 *
 * @example
 * createElement({ class: "btn", text: "Click me", id: "submit" }, "button");
 */
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

// ======================= Delete All Child Elements ======================= //
/**
 * Removes all child elements from a parent DOM element.
 *
 * @param {Element} parentElement - The parent element whose children should be removed.
 *
 * @example
 * deleteChildElements(document.querySelector("#container"));
 */
export function deleteChildElements(parentElement) {
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
}

// ======================= Element Exists ======================= //
/**
 * Checks if an element matching the selector exists in the DOM.
 *
 * @param {string} selector - CSS selector to check.
 * @param {Element|Document} [parent=document] - Optional parent to scope the query.
 * @returns {boolean} - True if the element exists, false otherwise.
 *
 * @example
 * elementExists("#nav"); // Returns true if an element with id "nav" exists
 */
export function elementExists(selector, parent = document) {
  return Boolean(parent.querySelector(selector));
}
