/**
 * =========================================================
 * TOKENS WATCHER
 *
 * Watches tokens.js and rebuilds theme CSS on changes
 * =========================================================
 */

import { watch } from "fs";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TOKENS_PATH = resolve(__dirname, "../app/design-system/tokens.js");

let rebuilding = false;

/**
 * Rebuild theme CSS
 */
function rebuild() {
    if (rebuilding) return;

    rebuilding = true;
    console.log("\n🔄 Detected change in tokens.js...");

    exec("node scripts/build-theme-css.js", (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Error: ${error.message}`);
            rebuilding = false;
            return;
        }
        if (stderr) {
            console.error(`⚠️  ${stderr}`);
        }
        console.log(stdout);
        rebuilding = false;
    });
}

/**
 * Start watching
 */
console.log("👀 Watching tokens.js for changes...");
console.log(`   Path: ${TOKENS_PATH}`);
console.log("   Press Ctrl+C to stop\n");

watch(TOKENS_PATH, (eventType, _) => {
    if (eventType === "change") {
        rebuild();
    }
});
