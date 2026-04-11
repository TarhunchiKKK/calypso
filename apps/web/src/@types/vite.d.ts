/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_URL: string;

    readonly VITE_BOARD_LS_KEY: string;

    readonly VITE_THEME_LS_KEY: string;

    readonly VITE_API_URL: string;

    readonly VITE_API_STALE_TIME: string;

    readonly VITE_API_GC_TIME: string;

    readonly VITE_S3_REGION: string;

    readonly VITE_S3_ENDPOINT: string;

    readonly VITE_S3_ACCESS_KEY: string;

    readonly VITE_S3_SECRETE_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
