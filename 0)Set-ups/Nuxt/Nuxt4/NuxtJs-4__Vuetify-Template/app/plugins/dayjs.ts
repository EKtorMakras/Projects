import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import "dayjs/locale/el";

dayjs.extend(objectSupport);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(duration);

export default defineNuxtPlugin(() => {
    const localeCookie = useCookie("locale");
    const initialLocale = localeCookie.value || "el";
    dayjs.locale(initialLocale);

    return {
        provide: {
            dayjs,
        },
    };
});
