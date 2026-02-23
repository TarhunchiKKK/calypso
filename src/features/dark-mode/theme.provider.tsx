"use client";

import { type PropsWithChildren, useEffect } from "react";
import { defaultTheme, setDocumentTheme, type Theme } from "./lib";

export function ThemeProvider({ children }: PropsWithChildren) {
    useEffect(() => {
        const theme = (localStorage.getItem(import.meta.env.VITE_THEME_LS_KEY) as Theme) ?? defaultTheme;

        setDocumentTheme(theme);

        localStorage.setItem(import.meta.env.VITE_THEME_LS_KEY, theme);
    }, []);

    return children;
}
