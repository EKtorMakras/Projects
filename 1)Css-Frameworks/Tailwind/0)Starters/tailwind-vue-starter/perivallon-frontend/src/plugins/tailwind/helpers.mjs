export function generateColorTokens({ baseColors, colorsWithShades, themeColors, shades }) {
    const createColorVar = (name, shade = null) => `rgb(var(--${shade ? `${name}-${shade}` : name}) / <alpha-value>)`;

    const colors = {};

    const generateShadesWithForeground = (name) => {
        const map = {};
        for (const step of shades) {
            map[step] = {
                DEFAULT: createColorVar(name, step),
                foreground: createColorVar(`on-${name}`, step),
            };
        }
        return map;
    };

    for (const color of baseColors) {
        const hasShades = colorsWithShades.includes(color);
        if (hasShades) {
            colors[color] = generateShadesWithForeground(color);
        } else {
            colors[color] = {
                DEFAULT: createColorVar(color, "500"),
                foreground: createColorVar(`on-${color}`, "500"),
            };
        }
    }

    for (const token of themeColors) {
        colors[token] = createColorVar(token);
    }

    return colors;
}

export function generateOpacityTokens(opacityKeys) {
    const opacities = {};

    opacityKeys.forEach((opacity) => {
        opacities[opacity] = `var(--opacity-${opacity})`;
    });

    return opacities;
}
