"use client";

import { ALargeSmall } from "lucide-react";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/kit";
import type { NodeStyles } from "../types";
import { FontSizes } from "./lib";

type Props = {
    value: number | null;
};

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
                {FontSizes.map(fontSize => (
                    <DropdownMenuItem key={fontSize.label} onClick={clickHandler.bind(null, fontSize.value)}>
                        {fontSize.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
