"use client";

import { CaseSensitive } from "lucide-react";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/kit";
import type { NodeStyles } from "../types";
import { Fonts } from "./constants";

type Props = {
    value: NodeStyles["fontFamily"] | null;
};

export function FontFamilyDropdown({ value: _ }: Props) {
    const clickHandler = (fontFamily: NodeStyles["fontFamily"]) => {
        console.log(fontFamily);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
                <Button size="icon" className="cursor-pointer">
                    <CaseSensitive className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {Fonts.map((font, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: List items will never be reordered
                    <DropdownMenuItem key={index} className="cursor-pointer" onClick={clickHandler.bind(null, font.value)}>
                        <span style={{ fontFamily: font.value }}>{font.label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
