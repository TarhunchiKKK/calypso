/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_THEME_LS_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
