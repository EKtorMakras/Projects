import { ref } from "vue";

/**
 * Copy-to-clipboard helper that tracks a short-lived "copied" flag per key so
 * UI can swap the trigger icon to a checkmark for a moment after a copy.
 *
 * Intentionally notification-free: the per-key flag already gives in-place
 * visual feedback. Callers can layer on a toast of their own if they need one.
 *
 * Usage:
 *   const { copy, isCopied } = useClipboard();
 *   await copy(value, key);          // key defaults to value itself
 *   isCopied(key);                   // true for `resetDelay` ms after copy
 */
export function useClipboard({ resetDelay = 2000 } = {}) {
    const copiedKey = ref(null);
    let resetTimer = null;

    async function copy(value, key = value) {
        if (value == null || value === "") return false;

        const text = String(value);

        try {
            // navigator.clipboard requires a secure context (HTTPS or
            // localhost). Fall back to the legacy execCommand path when the
            // app is served over plain HTTP.
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(text);
            } else if (!legacyCopy(text)) {
                throw new Error("Clipboard API unavailable and legacy copy failed");
            }
            flagCopied(key);
            return true;
        } catch (error) {
            console.error("[useClipboard] copy failed", error);
            return false;
        }
    }

    function legacyCopy(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.top = "0";
        textarea.style.left = "0";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        let ok;
        try {
            ok = document.execCommand("copy");
        } catch {
            ok = false;
        }
        document.body.removeChild(textarea);
        return ok;
    }

    function flagCopied(key) {
        copiedKey.value = key;
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
            // Only clear if this key is still the active one — a newer copy
            // of a different key has its own pending timer.
            if (copiedKey.value === key) copiedKey.value = null;
        }, resetDelay);
    }

    function isCopied(key) {
        return copiedKey.value === key;
    }

    return {
        copiedKey,
        copy,
        isCopied,
    };
}
