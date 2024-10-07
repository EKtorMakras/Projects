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
