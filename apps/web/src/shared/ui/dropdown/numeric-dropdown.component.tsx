"use client";

import type React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/kit";
import type { DropdownItem } from "./types";

type Props<T> = {
    placeholder: React.ReactNode;

    items: DropdownItem<T>[];

    title: string;

    onSelect: (value: T) => void;
};

export function NumericDropdown<T>({ placeholder, items, title, onSelect }: Props<T>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <Tooltip>
                    <TooltipTrigger asChild>{placeholder}</TooltipTrigger>

                    <TooltipContent>{title}</TooltipContent>
                </Tooltip>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {items.map((item, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: Index key will not change
                    <DropdownMenuItem key={index} className="cursor-pointer" onClick={onSelect.bind(null, item.value)}>
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
