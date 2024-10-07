import { config } from "@/common/config";

const cssVariableCache = {};

const patterns = {
  CSS_VARIABLE_REFERENCE: /^var\(\s*--[\w-]+\s*\)$/,
  CSS_VARIABLE_NAME: new RegExp(`var\\(\\s*--${config.COLOR_VARIABLE_PREFIX}-([\\w-]+)\\s*\\)`),
};

export { cssVariableCache, patterns };
