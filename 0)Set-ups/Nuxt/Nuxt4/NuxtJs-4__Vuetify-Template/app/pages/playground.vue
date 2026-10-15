<script setup>
import { computed, ref } from "vue";
import { useColor } from "@/composables/useColor";

// Disable SSR for playground page to avoid hydration mismatches
definePageMeta({
    ssr: false,
});

// ============================================================================
// COMPOSABLE: useColor
// ============================================================================
const {
    getColor,
    getHexColor,
    getCssColorVar,
    convertColorToHex,
    convertColorToRgb,
    adjustAlpha,
    lightenColor,
    darkenColor,
} = useColor();

// ── useColor: Input Values ──────────────────────────────────────────────────
const colorInput = ref("#4caf50");
const alphaInput = ref(1);
const percentInput = ref(20);
const opacityInput = ref(0.6);
const themeVar = ref("primary");

// ── useColor: Computed Results ──────────────────────────────────────────────
const hexSix = computed(() => convertColorToHex(colorInput.value, { sixDigit: true }));
const hexAuto = computed(() => convertColorToHex(colorInput.value));
const rgbAuto = computed(() => convertColorToRgb(colorInput.value));
const alphaApplied = computed(() => adjustAlpha(colorInput.value, Number(alphaInput.value)));
const lightApplied = computed(() => lightenColor(colorInput.value, Number(percentInput.value)));
const darkApplied = computed(() => darkenColor(colorInput.value, Number(percentInput.value)));
const cssVarRaw = computed(() => getCssColorVar(themeVar.value));
const hexFromVar = computed(() =>
    getHexColor(themeVar.value, {
        sixDigit: true,
    })
);
const rgbaFromVar = computed(() => {
    const value = cssVarRaw.value;
    if (!value) return null;
    return convertColorToRgb(`rgba(${value}, 1)`);
});
const themedRgbaExpr = computed(() => getColor(themeVar.value, Number(opacityInput.value)));

// ── useColor: Helper Functions ──────────────────────────────────────────────
function bgStyleFor(value) {
    if (!value) return { background: "transparent" };
    return { background: value };
}

// ============================================================================
// COMPOSABLE: useDate
// ============================================================================
import { useDateUtils } from "@/composables/useDateUtils";

const { formatDate, formatUtc, formatUtcToLocal } = useDateUtils();

// ── useDate: Input Values ───────────────────────────────────────────────────
const dateInput = ref("2024-01-15T12:00:00Z");
const formatPattern = ref("L");
const utcFormatPattern = ref("YYYY-MM-DDTHH:mm:ss[Z]");
const localFormatPattern = ref("L");

// ── useDate: Computed Results ───────────────────────────────────────────────
const formattedDate = computed(() => formatDate(dateInput.value, formatPattern.value));
const formattedUtc = computed(() => formatUtc(dateInput.value, utcFormatPattern.value));
const formattedUtcToLocal = computed(() => formatUtcToLocal(dateInput.value, localFormatPattern.value));
const formattedWithCustom = computed(() => formatDate(dateInput.value, "DD/MM/YYYY, HH:mm"));
const formattedFull = computed(() => formatDate(dateInput.value, "MMMM D, YYYY"));
const formattedTime = computed(() => formatDate(dateInput.value, "HH:mm:ss"));

// ============================================================================
// COMPOSABLE: useString (Future)
// ============================================================================
// Add useString composable imports and logic here

// ============================================================================
// COMPOSABLE: useNumber (Future)
// ============================================================================
// Add useNumber composable imports and logic here
</script>

<template>
    <ClientOnly>
        <v-container>
            <!-- ================================================================ -->
            <!-- PAGE HEADER -->
            <!-- ================================================================ -->
            <v-row>
                <v-col cols="12">
                    <h1 class="text-h3 mb-2">Composable Playground</h1>
                    <p class="text-body-1 mb-6">
                        Interactive testing area for all composables. Test different utilities and see results in
                        real-time.
                    </p>
                    <v-divider class="mb-8" />
                </v-col>
            </v-row>

            <!-- ================================================================ -->
            <!-- SECTION: COLOR COMPOSABLES -->
            <!-- ================================================================ -->
            <v-row>
                <v-col cols="12">
                    <div class="text-h4 mb-2">UseColor</div>
                    <p class="text-body-2 text-medium-emphasis mb-4">Color manipulation and conversion utilities</p>
                </v-col>
            </v-row>

            <!-- ──────────────────────────────────────────────────────────────── -->
            <!-- Subsection: useColor -->
            <!-- ──────────────────────────────────────────────────────────────── -->
            <v-row class="mb-8">
                <!-- Controls Card -->
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-card
                        variant="tonal"
                        class="pa-4 sticky-controls"
                    >
                        <div class="text-subtitle-1 font-weight-bold mb-4">Inputs & Controls</div>

                        <div class="mb-4">
                            <label class="text-caption mb-2 d-block"> Color Picker </label>
                            <v-color-picker
                                v-model="colorInput"
                                mode="hex"
                                width="100%"
                            />
                        </div>

                        <v-text-field
                            v-model="alphaInput"
                            type="number"
                            min="0"
                            max="1"
                            step="0.01"
                            label="Alpha (0-1)"
                            density="compact"
                            class="mb-2"
                        />

                        <v-text-field
                            v-model="percentInput"
                            type="number"
                            min="0"
                            max="100"
                            label="Lighten/Darken Percent (0-100)"
                            density="compact"
                            class="mb-2"
                        />

                        <v-text-field
                            v-model="themeVar"
                            label="Theme Variable (e.g. primary)"
                            density="compact"
                            class="mb-2"
                        />

                        <v-text-field
                            v-model="opacityInput"
                            type="number"
                            min="0"
                            max="1"
                            step="0.01"
                            label="Theme Opacity (0-1)"
                            density="compact"
                        />
                    </v-card>
                </v-col>

                <!-- Results with Color Swatches -->
                <v-col
                    cols="12"
                    md="8"
                >
                    <v-row>
                        <!-- Input Color -->
                        <v-col cols="12">
                            <div
                                class="color-result-card pa-4"
                                :style="bgStyleFor(colorInput)"
                            >
                                <div class="color-overlay pa-2">
                                    <code class="function-call">colorInput</code>
                                    <div class="result-value">{{ colorInput }}</div>
                                </div>
                            </div>
                        </v-col>

                        <!-- Separator: Converters -->
                        <v-col
                            cols="12"
                            class="py-2"
                        >
                            <v-divider />
                            <div class="text-caption text-medium-emphasis text-center mt-2">Color Converters</div>
                        </v-col>

                        <!-- convertColorToHex (6-digit) -->
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div
                                class="color-result-card pa-4"
                                :style="bgStyleFor(hexSix)"
                            >
                                <div class="color-overlay pa-2">
                                    <code class="function-call"> convertColorToHex(color, { sixDigit: true }) </code>
                                    <div class="result-value">{{ hexSix }}</div>
                                </div>
                            </div>
                        </v-col>

                        <!-- convertColorToHex (auto) -->
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div
                                class="color-result-card pa-4"
                                :style="bgStyleFor(hexAuto)"
                            >
                                <div class="color-overlay pa-2">
                                    <code class="function-call"> convertColorToHex(color) </code>
                                    <div class="result-value">{{ hexAuto }}</div>
                                </div>
                            </div>
                        </v-col>

                        <!-- convertColorToRgb -->
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div
                                class="color-result-card pa-4"
                                :style="bgStyleFor(rgbAuto)"
                            >
                                <div class="color-overlay pa-2">
                                    <code class="function-call"> convertColorToRgb(color) </code>
                                    <div class="result-value">{{ rgbAuto }}</div>
                                </div>
                            </div>
                        </v-col>

                        <!-- Separator: Adjusters -->
                        <v-col
                            cols="12"
                            class="py-2"
                        >
                            <v-divider />
                            <div class="text-caption text-medium-emphasis text-center mt-2">Color Adjusters</div>
                        </v-col>

                        <!-- adjustAlpha -->
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div
                                class="color-result-card pa-4"
                                :style="bgStyleFor(alphaApplied)"
                            >
                                <div class="color-overlay pa-2">
                                    <code class="function-call"> adjustAlpha(color, {{ alphaInput }}) </code>
                                    <div class="result-value">{{ alphaApplied }}</div>
                                </div>
                            </div>
                        </v-col>

                        <!-- lightenColor -->
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div
                                class="color-result-card pa-4"
                                :style="bgStyleFor(lightApplied)"
                            >
                                <div class="color-overlay pa-2">
                                    <code class="function-call"> lightenColor(color, {{ percentInput }}) </code>
                                    <div class="result-value">{{ lightApplied }}</div>
                                </div>
                            </div>
                        </v-col>

                        <!-- darkenColor -->
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div
                                class="color-result-card pa-4"
                                :style="bgStyleFor(darkApplied)"
                            >
                                <div class="color-overlay pa-2">
                                    <code class="function-call"> darkenColor(color, {{ percentInput }}) </code>
                                    <div class="result-value">{{ darkApplied }}</div>
                                </div>
                            </div>
                        </v-col>

                        <!-- Separator: Theme Functions -->
                        <v-col
                            cols="12"
                            class="py-2"
                        >
                            <v-divider />
                            <div class="text-caption text-medium-emphasis text-center mt-2">Theme Functions</div>
                        </v-col>

                        <!-- getCssColorVar -->
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div class="color-result-card pa-4 bg-surface-variant">
                                <div class="color-overlay pa-2">
                                    <code class="function-call"> getCssColorVar('{{ themeVar }}') </code>
                                    <div class="result-value">{{ cssVarRaw }}</div>
                                </div>
                            </div>
                        </v-col>

                        <!-- getHexColor -->
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div
                                class="color-result-card pa-4"
                                :style="bgStyleFor(hexFromVar)"
                            >
                                <div class="color-overlay pa-2">
                                    <code class="function-call">
                                        getHexColor('{{ themeVar }}', { sixDigit: true })
                                    </code>
                                    <div class="result-value">{{ hexFromVar }}</div>
                                </div>
                            </div>
                        </v-col>

                        <!-- rgba from theme var -->
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div
                                class="color-result-card pa-4"
                                :style="bgStyleFor(rgbaFromVar)"
                            >
                                <div class="color-overlay pa-2">
                                    <code class="function-call"> convertColorToRgb(rgba({{ cssVarRaw }}, 1)) </code>
                                    <div class="result-value">{{ rgbaFromVar }}</div>
                                </div>
                            </div>
                        </v-col>

                        <!-- getColor -->
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div
                                class="color-result-card pa-4"
                                :style="bgStyleFor(themedRgbaExpr)"
                            >
                                <div class="color-overlay pa-2">
                                    <code class="function-call"> getColor('{{ themeVar }}', {{ opacityInput }}) </code>
                                    <div class="result-value">
                                        {{ themedRgbaExpr }}
                                    </div>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <!-- ================================================================ -->
            <!-- SECTION: DATE & TIME COMPOSABLES -->
            <!-- ================================================================ -->
            <v-row class="mt-8">
                <v-col cols="12">
                    <v-divider class="mb-8" />
                    <div class="text-h4 mb-2">UseDate</div>
                    <p class="text-body-2 text-medium-emphasis mb-4">Date formatting and manipulation utilities</p>
                </v-col>
            </v-row>

            <!-- ──────────────────────────────────────────────────────────────── -->
            <!-- Subsection: useDate -->
            <!-- ──────────────────────────────────────────────────────────────── -->
            <v-row class="mb-8">
                <!-- Controls Card -->
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-card
                        variant="tonal"
                        class="pa-4 sticky-controls"
                    >
                        <div class="text-subtitle-1 font-weight-bold mb-4">Inputs & Controls</div>

                        <v-text-field
                            v-model="dateInput"
                            label="Date Input (ISO String)"
                            density="compact"
                            class="mb-3"
                            hint="Try: 2024-01-15T12:00:00"
                            persistent-hint
                        />

                        <v-text-field
                            v-model="formatPattern"
                            label="Format Pattern (formatDate)"
                            density="compact"
                            class="mb-2"
                            hint="L, DD/MM/YYYY, MMMM D, YYYY"
                        />

                        <v-text-field
                            v-model="utcFormatPattern"
                            label="UTC Format Pattern"
                            density="compact"
                            class="mb-2"
                            hint="YYYY-MM-DDTHH:mm:ss[Z]"
                        />

                        <v-text-field
                            v-model="localFormatPattern"
                            label="Local Format Pattern"
                            density="compact"
                            class="mb-3"
                            hint="L, DD/MM/YYYY HH:mm"
                        />

                        <v-divider class="my-3" />

                        <div class="text-caption text-medium-emphasis mb-2">Common Formats:</div>
                        <div class="d-flex flex-column ga-1">
                            <code class="text-caption pa-1">L - Localized date</code>
                            <code class="text-caption pa-1">DD/MM/YYYY - Day/Month/Year</code>
                            <code class="text-caption pa-1">MMMM D, YYYY - Full month</code>
                            <code class="text-caption pa-1">HH:mm:ss - Time 24h</code>
                        </div>
                    </v-card>
                </v-col>

                <!-- Results with Date Formats -->
                <v-col
                    cols="12"
                    md="8"
                >
                    <v-row>
                        <!-- Raw Input -->
                        <v-col cols="12">
                            <div class="date-result-card pa-4 bg-surface-variant">
                                <div class="result-content pa-2">
                                    <code class="function-call">dateInput (raw)</code>
                                    <div class="result-value">{{ dateInput }}</div>
                                </div>
                            </div>
                        </v-col>

                        <!-- Separator: formatDate -->
                        <v-col
                            cols="12"
                            class="py-2"
                        >
                            <v-divider />
                            <div class="text-caption text-medium-emphasis text-center mt-2">formatDate (Local)</div>
                        </v-col>

                        <!-- formatDate with custom pattern -->
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div class="date-result-card pa-4 bg-primary-lighten">
                                <div class="result-content pa-2">
                                    <code class="function-call"> formatDate(date, '{{ formatPattern }}') </code>
                                    <div class="result-value">{{ formattedDate }}</div>
                                </div>
                            </div>
                        </v-col>

                        <!-- formatDate with DD/MM/YYYY, HH:mm -->
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div class="date-result-card pa-4 bg-primary-lighten">
                                <div class="result-content pa-2">
                                    <code class="function-call"> formatDate(date, 'DD/MM/YYYY, HH:mm') </code>
                                    <div class="result-value">
                                        {{ formattedWithCustom }}
                                    </div>
                                </div>
                            </div>
                        </v-col>

                        <!-- formatDate with MMMM D, YYYY -->
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div class="date-result-card pa-4 bg-primary-lighten">
                                <div class="result-content pa-2">
                                    <code class="function-call"> formatDate(date, 'MMMM D, YYYY') </code>
                                    <div class="result-value">{{ formattedFull }}</div>
                                </div>
                            </div>
                        </v-col>

                        <!-- formatDate time only -->
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div class="date-result-card pa-4 bg-primary-lighten">
                                <div class="result-content pa-2">
                                    <code class="function-call"> formatDate(date, 'HH:mm:ss') </code>
                                    <div class="result-value">{{ formattedTime }}</div>
                                </div>
                            </div>
                        </v-col>

                        <!-- Separator: UTC Functions -->
                        <v-col
                            cols="12"
                            class="py-2"
                        >
                            <v-divider />
                            <div class="text-caption text-medium-emphasis text-center mt-2">UTC Functions</div>
                        </v-col>

                        <!-- formatUtc -->
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div class="date-result-card pa-4 bg-info-lighten">
                                <div class="result-content pa-2">
                                    <code class="function-call"> formatUtc(date, '{{ utcFormatPattern }}') </code>
                                    <div class="result-value">{{ formattedUtc }}</div>
                                </div>
                            </div>
                        </v-col>

                        <!-- formatUtcToLocal -->
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div class="date-result-card pa-4 bg-success-lighten">
                                <div class="result-content pa-2">
                                    <code class="function-call">
                                        formatUtcToLocal(date, '{{ localFormatPattern }}')
                                    </code>
                                    <div class="result-value">
                                        {{ formattedUtcToLocal }}
                                    </div>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <template #fallback>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <h1 class="text-h3 mb-2">Composable Playground</h1>
                            <p class="text-body-1 mb-6">Loading playground...</p>
                        </v-col>
                    </v-row>
                </v-container>
            </template>
        </v-container></ClientOnly
    >
</template>

<style scoped>
.color-result-card {
    min-height: 120px;
    height: 100%;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.color-result-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.color-overlay {
    background: rgba(var(--v-theme-surface), 0.92);
    backdrop-filter: blur(4px);
    border-radius: 6px;
    display: inline-block;
    min-width: 200px;
    max-width: 90%;
}

.function-call {
    display: block;
    font-size: 0.7rem;
    font-weight: 600;
    color: rgb(var(--v-theme-on-surface));
    background: rgba(var(--v-theme-surface), 0.98);
    border: 1px solid rgba(var(--v-theme-outline), 0.45);
    padding: 4px 8px;
    border-radius: 4px;
    margin-bottom: 6px;
    font-family: "Consolas", "Monaco", "Courier New", monospace;
    word-break: break-word;
}

.result-value {
    font-size: 0.95rem;
    font-weight: 700;
    color: rgb(var(--v-theme-on-surface));
    word-break: break-all;
}

/* Date Result Cards */
.date-result-card {
    min-height: 100px;
    height: 100%;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.date-result-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.result-content {
    background: rgba(var(--v-theme-surface), 0.92);
    backdrop-filter: blur(4px);
    border-radius: 6px;
    display: inline-block;
    min-width: 250px;
    max-width: 90%;
}

/* Background color variants */
.bg-primary-lighten {
    background: rgba(var(--v-theme-primary), 0.1);
}

.bg-info-lighten {
    background: rgba(var(--v-theme-info), 0.1);
}

.bg-success-lighten {
    background: rgba(var(--v-theme-success), 0.1);
}
</style>
