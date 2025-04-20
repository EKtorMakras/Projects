import config from "./config.mjs";
import { generateColorTokens, generateOpacityTokens } from "./helpers.mjs";

const colors = generateColorTokens(config);
const opacity = generateOpacityTokens(config.opacities);

export default {
    colors,
    opacity,
};
