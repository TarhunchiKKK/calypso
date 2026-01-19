"use client";

import { type PropsWithChildren, useEffect } from "react";
import { ENV } from "@/shared/config";
import { setDocumentTheme, type Theme } from "./lib";

const defaultTheme: Theme = "dark";

export function ThemeProvider({ children }: PropsWithChildren) {
    useEffect(() => {
        const theme = (localStorage.getItem(ENV.THEME_LS_KEY) as Theme) ?? defaultTheme;

        setDocumentTheme(theme);

        localStorage.setItem(ENV.THEME_LS_KEY, theme);
    }, []);

    return <>{children}</>;
}
