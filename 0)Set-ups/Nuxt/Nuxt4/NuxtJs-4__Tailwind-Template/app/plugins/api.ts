export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiUrl;

    type ApiOptions = Parameters<typeof $fetch>[1];
    type ApiBody = NonNullable<ApiOptions>["body"];

    const request = <T>(path: string, options: ApiOptions = {}) => {
        return $fetch<T>(`${baseUrl}${path}`, options);
    };

    const api = {
        get: <T>(path: string, options: ApiOptions = {}) => {
            return request<T>(path, {
                ...options,
                method: "GET",
            });
        },
        post: <T>(path: string, body?: ApiBody, options: ApiOptions = {}) => {
            return request<T>(path, {
                ...options,
                method: "POST",
                body,
            });
        },
        put: <T>(path: string, body?: ApiBody, options: ApiOptions = {}) => {
            return request<T>(path, {
                ...options,
                method: "PUT",
                body,
            });
        },
        patch: <T>(path: string, body?: ApiBody, options: ApiOptions = {}) => {
            return request<T>(path, {
                ...options,
                method: "PATCH",
                body,
            });
        },
        delete: <T>(path: string, options: ApiOptions = {}) => {
            return request<T>(path, {
                ...options,
                method: "DELETE",
            });
        },
    };

    return {
        provide: {
            api,
        },
    };
});
