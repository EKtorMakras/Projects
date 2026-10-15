# @emakras/vanilla-kit API — v0.7.0

Everything the package exports to consumers. Copy this file into a consumer project so tools and people know
the API of the installed version. Anything not listed here is internal and cannot be imported.

- SCSS ships as source: `@use "@emakras/vanilla-kit/scss" as kit;`. No `@use` emits CSS; only `@include` does. Every member has SassDoc `///` docs, shown on hover by editors such as Some Sass.
- JS is one barrel: `import { … } from "@emakras/vanilla-kit";`. Imports are DOM-free; browser helpers need a DOM when called.
- Install: `pnpm add "git+ssh://git@github.com/EKtorMakras/vanilla-kit.git#v0.7.0"`.

## SCSS

### Setup

```scss
// styles/_settings.scss: the only place the kit is configured; import it everywhere as `kit`
@use "@emakras/vanilla-kit/scss/palettes/tailwind"; // optional ready-made palette
@forward "@emakras/vanilla-kit/scss" with (
    $colors: (
        tailwind.$colors,
        (primary: #7357e8),
    ),
    $themes: (
        light: (
            surface: slate-50,
            text: slate-900,
            accent: primary-500,
        ),
        dark: (
            primary: #a594f9,
            success: #66bb6a,
            surface: slate-900,
            text: slate-50,
        ),
    )
);

// styles/style.scss
@use "settings" as kit;
@include kit.reset; // optional, inside @layer reset
@include kit.theme; // tokens, palettes and themes as CSS variables
```

Sizes are designed in px and emitted in rem of `$root-font-size` (default 10px: 1rem = 10px, set by `reset` as
`html { font-size: 62.5% }`); media queries use em. The settings file must be the first place the kit is loaded. Map settings merge into the defaults, nested maps
included: list only what changes, e.g. `$breakpoints: (sm: 640px)`; `null` removes a key. `$colors`, `$themes` and
`$color-steps` replace the default as a whole.

### Imports

| Path                                        | Contents                                         |
| ------------------------------------------- | ------------------------------------------------ |
| `@emakras/vanilla-kit/scss`                 | Every topic below                                |
| `@emakras/vanilla-kit/scss/<topic>`         | One topic, e.g. `…/scss/layout`                  |
| `@emakras/vanilla-kit/scss/palettes/<name>` | Optional palettes: `tailwind` (`$colors`, v3.4)  |
| `pkg:@emakras/vanilla-kit`                  | Same as `…/scss` with `sass --pkg-importer=node` |

### Configuration (`config`, all `!default`)

| Variable             | Default                                                                                                                                               | Meaning                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `$breakpoints`       | `sm 576px, md 768px, lg 1024px, xl 1280px, xxl 1536px`                                                                                                | Keys for `respond()`; emitted in `em`                                                 |
| `$root-font-size`    | `10px`                                                                                                                                                | `<html>` font size (1rem); `reset` sets `62.5%`. Defaults are px designs in rem of it |
| `$space-unit`        | `4px` (`0.4rem`)                                                                                                                                      | `space(n)` = n × unit                                                                 |
| `$space-steps`       | `16`                                                                                                                                                  | Highest `space()` step                                                                |
| `$container`         | `1152px` (`115.2rem`)                                                                                                                                 | `container` max width, `--container`                                                  |
| `$gutter`            | `24px` (`2.4rem`)                                                                                                                                     | `container` side padding, `--gutter`                                                  |
| `$columns`           | `12`                                                                                                                                                  | Default `columns()` count                                                             |
| `$radius-scale`      | `sm, md, lg, xl, full`                                                                                                                                | `radius()` keys                                                                       |
| `$shadows`           | `sm, md, lg, xl`                                                                                                                                      | `shadow()` keys                                                                       |
| `$font-sizes`        | `xs, sm, md, lg, xl, xxl, xxxl, display` (fluid from lg)                                                                                              | `fs()` keys                                                                           |
| `$font-weights`      | `light 300, regular 400, medium 500, semibold 600, bold 700`                                                                                          | `fw()` keys                                                                           |
| `$font-families`     | `body`, `heading`: `system-ui, sans-serif`; `mono`: `ui-monospace, …, monospace`                                                                      | `ff()` keys; quote names with spaces                                                  |
| `$durations`         | `fast 150ms, base 250ms, slow 400ms`                                                                                                                  | `duration()` keys                                                                     |
| `$easings`           | `in, out, in-out, out-expo, out-back`                                                                                                                 | `ease()` keys                                                                         |
| `$z-indexes`         | `content 1, header 100, dropdown 200, overlay 900, modal 1000, toast 1100`                                                                            | `z()` keys                                                                            |
| `$prefixes`          | `color: clr, space, radius, shadow, font-size: fs, font-weight: fw, font-family: ff, duration, ease, z-index: z, animation: kit`                      | CSS variable and @keyframes prefixes                                                  |
| `$colors`            | `()`                                                                                                                                                  | Palette: a map, or a list of maps merged in order (duplicates error)                  |
| `$status-colors`     | `success #2e7d32, warning #f5a623, error #d32752, info #1976d2`                                                                                       | Joined to the palette; a `$colors` entry with the same name wins                      |
| `$color-steps`       | `50: 95% … 500: 0% … 950: -75%`                                                                                                                       | Tint (+) / shade (−) per generated step                                               |
| `$fg-colors`         | `dark #000, light #fff`                                                                                                                               | Text colors of every `-fg` token; pure black/white where they miss 4.5:1              |
| `$themes`            | `()`                                                                                                                                                  | Semantic colors per theme; the first is the default                                   |
| `$theme-attribute`   | `data-theme`                                                                                                                                          | `:root[data-theme="<name>"]` selects a theme                                          |
| `$focus-color`       | `currentColor`                                                                                                                                        | `focus-ring` and button focus                                                         |
| `$hover-shift`       | `-12%`                                                                                                                                                | Hover background change: negative mixes black, positive white                         |
| `$disabled-opacity`  | `0.5`                                                                                                                                                 | Disabled buttons                                                                      |
| `$button-sizes`      | `sm, md, lg: (padding, font-size: <$font-sizes key>)`                                                                                                 | `btn($size)`, `btn-size()`                                                            |
| `$social-colors`     | 19 brands (facebook, instagram, x, threads, bluesky, linkedin, youtube, tiktok, twitch, spotify, github, gitlab, whatsapp, viber, telegram, discord…) | `social-color()`                                                                      |
| `$social-gradients`  | `instagram`                                                                                                                                           | Gradient on icon fonts                                                                |
| `$social-icon-box`   | `1.7em`                                                                                                                                               | Round box size relative to the icon                                                   |
| `$social-icon-sizes` | `sm 16px, md 24px, lg 32px, xl 40px` (in rem)                                                                                                         | `social-icon($size)`                                                                  |
| `$asset-base-path`   | `/assets`                                                                                                                                             | Root of `asset()` paths                                                               |

### Colors and themes

Every mixin argument that takes a color accepts a color name (`primary-500`, `surface`) as well as any CSS value;
names become their CSS variable and unknown names fail the build. Use `color(name)` for plain properties and
inside shorthands (`$border: 1px solid kit.color(line)`).

- `$colors` entry: a base color → generated `50…950` scale; a map of steps (a Tailwind hue) → used as given.
- Every palette name emits `--clr-<name>`, `--clr-<name>-fg`, `--clr-<name>-<step>` and `--clr-<name>-<step>-fg`
  (readable text color from `$fg-colors`, WCAG 4.5 where possible). Status colors are palettes too.
- `$themes` values: a color, a palette token (`primary-500`, `primary-500-fg`) or any CSS value. A token that does not
  exist is a compile error.
- A theme key that is a palette name (`dark: (primary: #a594f9)`) re-tints that whole scale for the theme.
- `color-scheme: light | dark` key sets the CSS property; automatic for themes named `light` / `dark`.
- Switch themes: `document.documentElement.dataset.theme = "dark"`.

| Member          | Signature      | Output                                                                                     |
| --------------- | -------------- | ------------------------------------------------------------------------------------------ |
| `theme` (mixin) | `theme`        | `:root { tokens, palettes, default theme }`, `:root[data-theme=<name>] { … }`. Root level. |
| `color`         | `color($name)` | `var(--clr-<name>)`; unknown names are a compile error                                     |

### Tokens

| Member              | Signature                       | Output                                              |
| ------------------- | ------------------------------- | --------------------------------------------------- |
| `properties`        | mixin, no arguments             | Every token as a CSS variable (`theme` includes it) |
| `custom-properties` | mixin `($values, $prefix: "")`  | `--<prefix><key>: <value>` per map entry            |
| `space`             | `space($step)` 0…`$space-steps` | `var(--space-4, 1.6rem)`; `space(0)` → `0`          |
| `radius`            | `radius($key: md)`              | `var(--radius-md, 0.8rem)`                          |
| `shadow`            | `shadow($key: md)`              | `var(--shadow-md, …)`                               |
| `fs`                | `fs($key: md)`                  | `var(--fs-md, 1.6rem)`                              |
| `fw`                | `fw($key: regular)`             | `var(--fw-regular, 400)`                            |
| `ff`                | `ff($key: body)`                | `var(--ff-body, system-ui, sans-serif)`             |
| `duration`          | `duration($key: base)`          | `var(--duration-base, 250ms)`                       |
| `ease`              | `ease($key: out)`               | `var(--ease-out, cubic-bezier(…))`                  |
| `z`                 | `z($key)`                       | `var(--z-modal, 1000)`                              |

Unknown keys are a compile error listing the available keys. `properties` also emits `--container` and `--gutter`.

### Color math (compile time, Sass colors only)

| Function       | Signature                                                      | Output                                                  |
| -------------- | -------------------------------------------------------------- | ------------------------------------------------------- |
| `tint`         | `tint($color, $amount: 15%)`                                   | Color mixed with white                                  |
| `shade`        | `shade($color, $amount: 15%)`                                  | Color mixed with black                                  |
| `luminance`    | `luminance($color)`                                            | 0…1 relative luminance                                  |
| `contrast`     | `contrast($a, $b)`                                             | WCAG ratio 1…21                                         |
| `fg-color`     | `fg-color($bg, $dark: #000, $light: #fff, $min-contrast: 4.5)` | The candidate with higher contrast; error below minimum |
| `color-scale`  | `color-scale($base, $steps: $color-steps)`                     | Map `(50: …, …, 950: …)`, 500 = base                    |
| `color-tokens` | `color-tokens($name, $scale, $dark, $light, $min-contrast)`    | Map `("name-500": …, "name-500-fg": …)`                 |

### Media

| Mixin             | Signature                     | Output                                                |
| ----------------- | ----------------------------- | ----------------------------------------------------- |
| `respond`         | `respond($breakpoint) { … }`  | `@media (width >= 48em)`; key or length (px, rem, em) |
| `respond-below`   | `respond-below($breakpoint)`  | `@media (width < 48em)`                               |
| `respond-between` | `respond-between($from, $to)` | `@media (36em <= width < 64em)`                       |
| `reduced-motion`  | `reduced-motion { … }`        | `@media (prefers-reduced-motion: reduce)`             |
| `hover`           | `hover { … }`                 | `:hover` only on devices that can hover               |

### Layout

| Mixin        | Signature                                                                          | Output                                               |
| ------------ | ---------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `flex`       | `flex($direction: row, $justify: flex-start, $align: center, $gap, $wrap: nowrap)` | Flex container                                       |
| `stack`      | `stack($gap: 16px)`                                                                | Vertical flow with a constant gap                    |
| `cluster`    | `cluster($gap: 16px, $align: center, $justify: flex-start)`                        | Wrapping row (tags, buttons, nav)                    |
| `grid`       | `grid($min: 256px, $gap: 16px, $max-columns: null)`                                | Auto-fit columns ≥ `$min`, no breakpoints            |
| `columns`    | `columns($count: $columns, $gap: 16px)`                                            | `$count` equal grid columns                          |
| `span`       | `span($count, $start: null)`; `span(full)`                                         | Child covering columns                               |
| `container`  | `container($max: $container, $gutter: $gutter)`                                    | Centered column with side gutters                    |
| `center`     | `center($method: grid \| flex \| absolute)`                                        | Centers children, or the element itself (`absolute`) |
| `full-bleed` | `full-bleed`                                                                       | Breaks out of a container to full viewport width     |
| `section`    | `section($padding: clamp(48px, 8vw, 96px))`                                        | Vertical section padding                             |

### Components

| Mixin      | Signature                                                                                                                                                                                                                         | Output                                                                                 |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `btn`      | `btn($color: null, $variant: filled \| outlined, $size: md, $text, $hover-text, $hover-shift, $radius: radius(md), $shadow)`                                                                                                      | Button with hover, focus and disabled states                                           |
| `btn-size` | `btn-size($size)`                                                                                                                                                                                                                 | Padding and font size from `$button-sizes`                                             |
| `surface`  | `surface($background, $color, $padding: space(6), $radius: radius(md), $border, $shadow)`                                                                                                                                         | Box; `null` arguments emit nothing                                                     |
| `card`     | `card($background, $padding: space(6), $radius: radius(lg), $shadow: shadow(md))`                                                                                                                                                 | Surface with larger radius and shadow                                                  |
| `dialog`   | `dialog($background: Canvas, $color: CanvasText, $width: rem(512px), $padding, $radius: radius(lg), $border, $shadow: shadow(xl), $backdrop: rgb(0 0 0 / 50%), $margin: space(4), $duration: duration(base), $lock-scroll: true)` | Native `<dialog>`: box, backdrop, open/close transition, no page scroll behind a modal |

`btn` colors: a color name (`primary`, `success-600`, `accent`) → `var(--clr-…)`, `var(--clr-…-fg)` and a `color-mix()`
hover, following the theme; an unknown name or a name without `-fg` (and no `$text`) is a compile error. Any other CSS
value (`var(--brand)`, `#7357e8`) → used as given with a `color-mix()` hover; pass `$text`.
Without `$color` only layout, size, focus and disabled styles are emitted.

`dialog` styles a native `<dialog>`; open it with `showModal()` or the JS `openDialog()` / `initDialogs()`. The
transition (fade and scale, `@starting-style`) runs only without reduced motion; browsers without `@starting-style`
open and close at once. `$lock-scroll` adds `:root:has(<selector>:modal) { overflow: hidden; }`.

### Forms

Native inputs without the browser's default look; they stay real inputs for keyboard, forms and screen readers.
Sizes are in `em`; colors accept names (`primary`) or any CSS value.

| Mixin      | Signature                                                                                                                                        | Output                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `field`    | `field($border-color, $focus-color: $focus-color, $invalid-color: error, $background: transparent, $radius: radius(md), $padding: 0.5em 0.75em)` | Input/textarea: border, placeholder, focus glow, invalid, disabled |
| `select`   | `select($field-options...)`                                                                                                                      | `field()` + `appearance: none` + a gradient arrow                  |
| `checkbox` | `checkbox($color: currentColor, $mark-color: #fff, $border-color, $size: 1.15em, $radius: 0.25em)`                                               | Box with a scaled-in check; dash on `:indeterminate`               |
| `radio`    | `radio($color: currentColor, $border-color, $size: 1.15em)`                                                                                      | Ring with a scaled-in dot                                          |
| `switch`   | `switch($color: currentColor, $knob-color: #fff, $track-color, $size: 1.25em)`; add `role="switch"`                                              | Pill track, sliding knob                                           |

### Accessibility, typography, reset

| Mixin             | Signature                                                                               | Output                                              |
| ----------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `focus-ring`      | `focus-ring($color: $focus-color, $offset: 3px, $width: 2px)`                           | Outline on `:focus-visible` only                    |
| `visually-hidden` | `visually-hidden`                                                                       | Hidden on screen, read by screen readers            |
| `truncate`        | `truncate($lines: 1)`                                                                   | Ellipsis on one line, or a line clamp               |
| `link-underline`  | `link-underline($color: currentColor, $thickness: 2px, $offset: 0.15em, $origin: left)` | Underline that grows on hover/focus                 |
| `reset`           | `reset($layer: reset)`; `reset($layer: null)` unlayered                                 | Modern reset; lists with `role="list"` lose bullets |

### Decoration

| Mixin        | Signature                                                                   | Output                                           |
| ------------ | --------------------------------------------------------------------------- | ------------------------------------------------ |
| `gradient`   | `gradient($colors, $direction: to right, $type: linear \| radial \| conic)` | `background-image` gradient                      |
| `stripes`    | `stripes($colors, $direction: to right)`                                    | Equal hard-edged bands                           |
| `triangle`   | `triangle($size, $direction, $color)`                                       | CSS border triangle                              |
| `scrollbar`  | `scrollbar($thumb, $thumb-hover, $track, $size: 8px, $radius: 4px)`         | Styled scrollbar (WebKit + standard)             |
| `bg-image`   | `bg-image($image, $size: cover, $position: center)`                         | Background from `image-path()` or a url/gradient |
| `overlay`    | `overlay($background: rgb(0 0 0 / 30%), $pseudo: after)`                    | Tinted layer between background and content      |
| `transition` | `transition($properties: all, $duration: duration(), $easing: ease())`      | Same timing for each property                    |

### Animation

Emit the @keyframes once at the root, then apply them anywhere. Names: `fade-in`, `fade-out`, `slide-up`,
`slide-down`, `scale-in`, `spin`, `pulse`, `shake`. The reset turns animations off for reduced motion.

| Mixin       | Signature                                                                                   | Output                                             |
| ----------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `keyframes` | `keyframes($names...)`; none = all                                                          | `@keyframes kit-<name> { … }`. Root level, once.   |
| `animate`   | `animate($name, $duration, $easing, $delay, $iterations, $fill: both)`; null = the defaults | `animation: kit-<name> <duration> <easing> … both` |

Defaults: `duration()` and `ease()`, played once; `spin` is 1s linear infinite, `pulse` 2s ease-in-out infinite.

### Assets, units, social

| Member         | Signature                                                                                                                                   | Output                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `asset`        | `asset($type, $file)`                                                                                                                       | `url("<$asset-base-path>/<type>/<file>")` |
| `image-path`   | `image-path($file)`                                                                                                                         | `url(".../images/<file>")`                |
| `icon-path`    | `icon-path($file)`                                                                                                                          | `url(".../icons/<file>")`                 |
| `svg-url`      | `svg-url($svg)`                                                                                                                             | `url("data:image/svg+xml,…")`             |
| `rem`          | `rem($pixels, $base: $root-font-size)`                                                                                                      | `rem(24px)` → `2.4rem`                    |
| `em`           | `em($pixels, $base: 16px)`                                                                                                                  | `em(24px, 12px)` → `2em`                  |
| `strip-unit`   | `strip-unit($number)`                                                                                                                       | `24px` → `24`                             |
| `social-color` | `social-color($name)`                                                                                                                       | Brand color                               |
| `social-icon`  | `social-icon($name, $size: md, $official: false, $official-on-hover: false, $color: currentColor, $hover-color, $background, $radius: 50%)` | Round brand icon link (icon font or SVG)  |

## JavaScript

| Function                   | Arguments                                                                         | Returns                                                                                                               |
| -------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `arrFirst`                 | `(array, count = 1)`                                                              | First element, or first `count` as an array                                                                           |
| `arrLast`                  | `(array, count = 1)`                                                              | Last element, or last `count` as an array                                                                             |
| `arrRandom`                | `(array)`                                                                         | A random element                                                                                                      |
| `arrGetUniqueObjectValues` | `(array, key)`                                                                    | Unique values of `key`, first-seen order                                                                              |
| `arrGroupBy`               | `(array, key)`                                                                    | `{ [value]: objects[] }`                                                                                              |
| `arrIsNotEmpty`            | `(value)`                                                                         | `true` for a non-empty array                                                                                          |
| `arrShuffle`               | `(array)`                                                                         | Shuffled copy                                                                                                         |
| `arrFindMinMaxByKey`       | `(array, key)`                                                                    | `{ min, max }`                                                                                                        |
| `arrChunk`                 | `(array, size)`                                                                   | Array of chunks                                                                                                       |
| `arrCompact`               | `(array)`                                                                         | Without falsy values                                                                                                  |
| `arrFlatten`               | `(array)`                                                                         | Flattened one level                                                                                                   |
| `getCssColorVariable`      | `(colorName)` without `--clr-`                                                    | Raw value of `--clr-<name>`, or `null`                                                                                |
| `clearCssVariableCache`    | `()`                                                                              | Empties the lookup cache; call after a theme change                                                                   |
| `resolveCssVariableColor`  | `(color)`                                                                         | Value of a `var(--clr-*)`, other colors unchanged                                                                     |
| `getColor`                 | `(colorName)`                                                                     | `"var(--clr-<name>)"` if defined, else `null`                                                                         |
| `getHexColor`              | `(colorName)`                                                                     | Hex string (charts, canvas), or `null`                                                                                |
| `getRgbColor`              | `(colorName)`                                                                     | `rgb()`/`rgba()` string, or `null`                                                                                    |
| `getNextDay`               | `(offset, length = 7)`                                                            | Day abbreviation (`"MON"`) `offset` days after tomorrow                                                               |
| `formatDate`               | `(date = new Date())`                                                             | `"YYYY-MM-DD"`; throws on invalid dates                                                                               |
| `formatRelativeDate`       | `(toDate, fromDate = new Date(), locale = "en")`                                  | `"2 days ago"`; locales `en`, `el` loaded                                                                             |
| `isSameDay`                | `(firstDate, secondDate)`                                                         | `boolean`                                                                                                             |
| `getStartOfWeek`           | `(date = new Date(), weekStart = 0)`                                              | `Date` at midnight of the week's first day                                                                            |
| `addDays`                  | `(date, days)`                                                                    | New `Date`; negative subtracts                                                                                        |
| `openDialog`               | `(dialog \| selector)`                                                            | `Promise<string>`: the `returnValue` when it closes (`""` for Escape or backdrop)                                     |
| `closeDialog`              | `(dialog \| selector, returnValue)`                                               | Closes it; `openDialog()` resolves with the value                                                                     |
| `initDialogs`              | `(root = document)`                                                               | Wires `data-dialog-open="#id"`, `data-dialog-close="value"` and backdrop clicks; returns a remover                    |
| `addGlobalEventListener`   | `(type = "click", selector, callback(event, target), parent = document, options)` | Delegated listener; returns a remover function                                                                        |
| `getDomElement`            | `(selector, multiple = false, parent = document)`                                 | Element, or array of all matches                                                                                      |
| `createHtmlElement`        | `(html)` trusted markup, one root                                                 | `Element`                                                                                                             |
| `createElement`            | `(options = {}, type = "div")`; options `class`, `dataset`, `text`, any attribute | `Element`                                                                                                             |
| `deleteChildElements`      | `(parent)`                                                                        | Removes child elements, keeps text nodes                                                                              |
| `elementExists`            | `(selector, parent = document)`                                                   | `boolean`                                                                                                             |
| `timeout`                  | `(seconds)`                                                                       | Promise that rejects after the delay                                                                                  |
| `requestJSON`              | `(url, { method, body, headers, timeoutMs = 10000, signal, ...fetchOptions })`    | `Promise<{ data, error }>`; never throws; object bodies sent as JSON                                                  |
| `getJSON`                  | `(url, { timeoutMs = 10000, ...fetchOptions })`                                   | `Promise<{ data, error }>`; never throws                                                                              |
| `postJSON`                 | `(url, body, options)`                                                            | `Promise<{ data, error }>`; never throws                                                                              |
| `sanitizeInput`            | `(text)`                                                                          | HTML-escaped text for text nodes (not an HTML sanitizer)                                                              |
| `copyToClipboard`          | `(text)`                                                                          | `Promise<void>`                                                                                                       |
| `getParameterValue`        | `(name, url = location.href)`                                                     | Decoded value, `""` without value, `null` when missing                                                                |
| `debounce`                 | `(callback, waitMs)`                                                              | Function that runs only the last call, after `waitMs` of quiet; `.cancel()`                                           |
| `throttle`                 | `(callback, intervalMs)`                                                          | Function that runs at most once per interval (first and latest call); `.cancel()`                                     |
| `createLogger`             | `(app = "", { level, catchErrors = false })`                                      | `{ trace, debug, info, warn, error, fatal, stopCatchingErrors }`; colored labels, real caller line                    |
| `isNumber`                 | `(value)`                                                                         | `true` for finite numbers                                                                                             |
| `padTo2Digits`             | `(number)`                                                                        | `"05"`                                                                                                                |
| `formatDecimals`           | `(number, digits = 2)`                                                            | Fixed decimals; integers unchanged                                                                                    |
| `randomNumberBetween`      | `(min, max)`                                                                      | Integer, both inclusive                                                                                               |
| `numberIsEven`             | `(number)`                                                                        | `boolean`                                                                                                             |
| `getAverage`               | `(...numbers)`                                                                    | Mean; throws without numbers                                                                                          |
| `formatNumber`             | `(number, "compact" \| "scientific", locale)`                                     | `"1K"`                                                                                                                |
| `clampNumber`              | `(value, min, max)`                                                               | Number within the range                                                                                               |
| `formatCurrency`           | `(number, currency = "USD", locale = "en-US")`                                    | `"$1,234.56"`                                                                                                         |
| `getItemLs`                | `(key)`                                                                           | Parsed localStorage value, or `null`                                                                                  |
| `setItemLs`                | `(key, value)`                                                                    | Stores JSON                                                                                                           |
| `updateItemLs`             | `(key, property, value)`                                                          | Sets one property of a stored object                                                                                  |
| `toProperCase`             | `(text)`                                                                          | `"Hello"`                                                                                                             |
| `cleanUppercaseText`       | `(text)`                                                                          | Text without accents                                                                                                  |
| `truncateString`           | `(text, maxLength, suffix = "...")`                                               | Text cut to `maxLength`, suffix included                                                                              |
| `createThemeSwitcher`      | `(themes, { storageKey = "theme", attribute = "data-theme" })`                    | `{ themes, getTheme, setTheme, cycleTheme, initTheme }`; each change sets `<html data-theme>` and fires `themechange` |

Validation errors throw with the function name; storage and browser errors reach the caller.

Fetch errors: an HTTP error has `error.status` and `error.data` (the server's answer, JSON or text); a timeout is
`Error("Request timed out")`. Empty answers (`204`) are `data: null`.

`createThemeSwitcher`: pass the names of `$themes`. Without a stored choice it picks `dark` or `light` from the system
preference when they exist, else the first theme. Use a `storageKey` per app (apps on one localhost share storage).
`initTheme()` applies without storing; `setTheme()` throws for unknown names; `themechange` has `detail: { theme }`.

`createLogger`: each method takes `console.log` arguments. Default level is `trace` in development (Vite
`import.meta.env.DEV`) and `info` otherwise. `catchErrors: true` also logs uncaught errors and unhandled rejections.
