import { CONFIG } from "@/common/config.js";

export function useTitle() {
    function setTitle(title) {
        document.title = title ? `${title} | ${CONFIG.app_title}` : CONFIG.app_title;
    }

    return { setTitle };
}
