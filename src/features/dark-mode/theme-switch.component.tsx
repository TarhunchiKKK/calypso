"use client";

import { Moon, Sun } from "lucide-react";
import { ENV } from "@/shared/config";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/kit";
import { setDocumentTheme, type Theme } from "./lib";

export function ThemeSwitch() {
    const setTheme = (theme: Theme) => {
        setDocumentTheme(theme);

        localStorage.setItem(ENV.THEME_LS_KEY, theme);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

                    <span className="sr-only">Change mode</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={setTheme.bind(null, "light")}>Light</DropdownMenuItem>

                <DropdownMenuItem onClick={setTheme.bind(null, "dark")}>Dark</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
