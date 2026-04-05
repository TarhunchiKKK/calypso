/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_URL: string;

    readonly VITE_BOARD_LS_KEY: string;

    readonly VITE_THEME_LS_KEY: string;

    readonly VITE_API_URL: string;

    readonly VITE_API_STALE_TIME: string;

    readonly VITE_API_GC_TIME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
