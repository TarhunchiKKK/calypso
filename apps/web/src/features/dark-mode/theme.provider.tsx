import { type PropsWithChildren, useEffect } from "react";
import { Env } from "@/shared/config";
import { defaultTheme, setDocumentTheme, type Theme } from "./lib";

export function ThemeProvider({ children }: PropsWithChildren) {
    useEffect(() => {
        const theme = (localStorage.getItem(Env.ls.themeKey) as Theme) ?? defaultTheme;

        setDocumentTheme(theme);

        localStorage.setItem(Env.ls.themeKey, theme);
    }, []);

    return children;
}
