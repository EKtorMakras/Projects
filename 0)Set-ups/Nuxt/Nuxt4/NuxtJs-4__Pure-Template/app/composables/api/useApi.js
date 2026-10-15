import { apiStatus, withAsync } from "~/modules/api";

export function useApi() {
    const { $api } = useNuxtApp();

    const exec = async (statusRef, key, apiMethod, ...args) => {
        statusRef.value[key] = apiStatus.Pending;

        const { response, error } = await withAsync(apiMethod, ...args);

        statusRef.value[key] = error ? apiStatus.Error : apiStatus.Success;

        return { response, error };
    };

    const createEndpointExec = (statusRef, key) => {
        return (apiMethod, ...args) => exec(statusRef, key, apiMethod, ...args);
    };

    return { exec, createEndpointExec, apiStatus, api: $api };
}
