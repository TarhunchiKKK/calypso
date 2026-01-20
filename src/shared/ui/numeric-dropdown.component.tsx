"use client";

import type React from "react";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/kit";
import type { DropdownItem } from "../../features/board-editor/modules/styling/ui/lib";

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
            <DropdownMenuTrigger asChild>
                <Button size="icon" className="cursor-pointer">
                    {placeholder}
                </Button>
            </DropdownMenuTrigger>

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
