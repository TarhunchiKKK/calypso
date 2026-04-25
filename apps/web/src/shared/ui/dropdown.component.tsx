import type React from "react";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/kit";

export type DropdownItem<T> = {
    label: React.ReactNode;

    value: T;
};

type Props<T> = {
    title?: string;

    placeholder: React.ReactNode;

    items: DropdownItem<T>[];

    onSelect: (value: T) => void;
};

export function Dropdown<T>({ placeholder, items, title, onSelect }: Props<T>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer outline-none" onClick={() => console.log("click")}>
                {title ? (
                    <Tooltip>
                        <TooltipTrigger asChild>{placeholder}</TooltipTrigger>

                        <TooltipContent>{title}</TooltipContent>
                    </Tooltip>
                ) : (
                    <Button variant="outline">{placeholder}</Button>
                )}
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {items.map((item, index) => (
                    <DropdownMenuItem key={index} className="cursor-pointer" onClick={onSelect.bind(null, item.value)}>
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
