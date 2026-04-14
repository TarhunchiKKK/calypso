export const Env = {
    app: {
        url: import.meta.env.VITE_APP_URL
    },
    ls: {
        themeKey: import.meta.env.VITE_THEME_LS_KEY
    },
    api: {
        url: import.meta.env.VITE_API_URL,
        staleTime: +import.meta.env.VITE_API_STALE_TIME,
        gcTime: +import.meta.env.VITE_API_GC_TIME
    }
};
