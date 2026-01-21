"use client";

import type React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/kit";
import type { DropdownItem } from "./types";

type Props<T> = {
    value: number | null;

    placeholder: React.ReactNode;

    items: DropdownItem<T>[];
};

export function NumericDropdown<T>({ placeholder, items }: Props<T>) {
    const clickHandler = (value: T) => {
        console.log(value);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">{placeholder}</DropdownMenuTrigger>

            <DropdownMenuContent>
                {items.map((item, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: Index key will not change
                    <DropdownMenuItem key={index} className="cursor-pointer" onClick={clickHandler.bind(null, item.value)}>
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
