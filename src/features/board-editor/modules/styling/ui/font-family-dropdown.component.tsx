"use client";

import type { CSSProperties } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/kit";
import type { DropdownItem } from "./types";

type Props = {
    fontFamily: CSSProperties["fontFamily"] | null;
};

const availableFonts: DropdownItem[] = [
    {
        label: "Sans Serif",
        value: "sans-serif"
    },
    {
        label: "Fantasy",
        value: "fantasy"
    },
    {
        label: "Math",
        value: "math"
    },
    {
        label: "Monospace",
        value: "monospace"
    }
];

export function FontFamilyDropdown({ fontFamily }: Props) {
    const clickHandler = (fontFamily: CSSProperties["fontFamily"]) => {
        console.log(fontFamily);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                {fontFamily === null ? "ABC" : <span style={{ fontFamily: fontFamily }}>{fontFamily}</span>}
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {availableFonts.map(font => (
                    <DropdownMenuItem key={font.label} className="cursor-pointer" onClick={clickHandler.bind(null, font.value)}>
                        <span style={{ fontFamily: font.value }}>{font.label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
