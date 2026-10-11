import { getLogLevelName } from "roarr";

//---- Labels to display for each log level ----//
const labels = {
  trace: "TRC",
  debug: "DBG",
  info: "INF",
  warn: "WRN",
  error: "ERR",
  fatal: "FAT",
};

//---- Styling for log level, message and app ----//
const styles = (() => {
  // Helper functions for generating styles
  const fgColor = (color) => `color: ${color};`;
  const bgColor = (color) => `background-color: ${color};`;
  const paddingX = (left, right) => `padding-left: ${left}; padding-right: ${right};`;
  const marginX = (left, right) => `margin-left: ${left}; margin-right: ${right};`;
  const createLabel = (color, backgroundColor) => {
    return fgColor(color) + bgColor(backgroundColor) + paddingX("1em", "1em") + marginX("0em", "1em");
  };

  // Log level styles
  const level = {
    trace: createLabel("white", "grey"),
    debug: createLabel("white", "#444"),
    info: createLabel("white", "green"),
    warn: createLabel("white", "#c70"),
    error: createLabel("white", "red"),
    fatal: createLabel("white", "#a00"),
  };

  // Message styles
  const message = {
    info: fgColor("green"),
    warn: fgColor("#c70"),
    error: fgColor("#e00"),
    fatal: fgColor("#e00"),
  };

  // App style
  const app = createLabel("#333", "rgba(200,200,200,.5)");

  return { level, message, app };
})();

//---- Caller tracing ----//
const stackRegex = /^\s*(.+)\s+\((http[^)]+)\)$/;

function getCaller() {
  const stack = new Error().stack.split("\n");
  const caller = stack[6]; // Lines before belong to the logging system
  const parsedCaller = stackRegex.exec(caller);
  if (parsedCaller !== null && parsedCaller.length == 3) {
    return parsedCaller[2];
  } else {
    return "Failed to trace!";
  }
}

//---- MultilinePrinter ----//
/**
 * A helper class for printing multiline logs to the console in collapsed
 * groups. If just one line is provided to the printer then no group will
 * be created.
 */
class MultilinePrinter {
  constructor() {
    this.buffer = [];
  }

  addLine(...message) {
    this.buffer.push(message);
  }

  print() {
    if (this.buffer.length == 1) {
      // Regular print
      console.log(...this.buffer[0]);
    } else if (this.buffer.length > 1) {
      // Groupped print
      console.groupCollapsed(...this.buffer[0]);
      for (let i = 1; i < this.buffer.length; i++) {
        console.log(...this.buffer[i]);
      }
      console.groupEnd();
    }
    this.buffer = [];
  }
}

//---- The writer ----//
export function createConsoleWriter(apps = null) {
  const printer = new MultilinePrinter();

  return (serialized) => {
    const record = JSON.parse(serialized);

    // In development mode print all messages. In any other case print only
    // from INFO level and above.
    const showMessage = import.meta.env.DEV || record.context.logLevel >= 30;

    // Show caller link only in development mode
    const showCaller = import.meta.env.DEV;

    if (showMessage) {
      const logLevel = getLogLevelName(record.context.logLevel);

      // Filter messages by app name
      const app = record.context.app || null;
      if (apps == null || apps.includes(app)) {
        printer.addLine(
          `%c${labels[logLevel]}%c${app || ""}%c${record.message}`,
          styles.level[logLevel],
          styles.app,
          styles.message[logLevel]
        );
      }

      // Add caller link
      if (showCaller) {
        printer.addLine(getCaller());
      }

      // Write to console
      printer.print();
    }
  };
}
