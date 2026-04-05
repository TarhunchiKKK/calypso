"use client";

import { Moon, Sun } from "lucide-react";
import { Env } from "@/shared/config";
import { Button } from "@/shared/ui/kit";
import { defaultTheme, setDocumentTheme, type Theme } from "./lib";

export function ThemeSwitch() {
    const toggleTheme = () => {
        const currentTheme = (localStorage.getItem(Env.ls.themeKey) as Theme) ?? defaultTheme;

        const newTheme = currentTheme === "light" ? "dark" : "light";

        setDocumentTheme(newTheme);

        localStorage.setItem(Env.ls.themeKey, newTheme);
    };

    return (
        <Button variant="outline" size="icon" className="cursor-pointer" onClick={toggleTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    );
}
