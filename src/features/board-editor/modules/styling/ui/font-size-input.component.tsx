"use client";

import { ALargeSmall } from "lucide-react";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/kit";
import type { NodeStyles } from "../types";
import type { DropdownItem } from "./types";

type Props = {
    value: number | null;
};

const availableFontSizes: DropdownItem<"fontSize">[] = [
    {
        label: 4,
        value: 4
    },
    {
        label: 8,
        value: 8
    },

    {
        label: 12,
        value: 12
    },

    {
        label: 18,
        value: 18
    },
    {
        label: 24,
        value: 24
    },
    {
        label: 32,
        value: 32
    },
    {
        label: 48,
        value: 48
    }
];

export function FontSizeInput({ value: _ }: Props) {
    const clickHandler = (value: NodeStyles["fontSize"]) => {
        console.log(value);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" className="cursor-pointer">
                    <ALargeSmall className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {availableFontSizes.map(fontSize => (
                    <DropdownMenuItem key={fontSize.label} onClick={clickHandler.bind(null, fontSize.value)}>
                        {fontSize.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
