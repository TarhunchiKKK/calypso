"use client";

import type { NodeStyles } from "@repo/common";
import { CaseSensitive } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/kit";
import { Fonts } from "../constants";

type Props = {
    onSelect: (fontFamily: NodeStyles["fontFamily"]) => void;
};

export function FontFamilyDropdown({ onSelect }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <CaseSensitive className="h-4 w-4 dark:text-white" />
                    </TooltipTrigger>

                    <TooltipContent>Font Family</TooltipContent>
                </Tooltip>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {Fonts.map((font, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: List items will never be reordered
                    <DropdownMenuItem key={index} className="cursor-pointer" onClick={onSelect.bind(null, font.value)}>
                        <span style={{ fontFamily: font.value }}>{font.label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
