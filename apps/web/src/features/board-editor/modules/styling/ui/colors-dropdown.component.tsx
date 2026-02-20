"use client";

import type React from "react";
import { Popover, PopoverContent, PopoverTrigger, ToggleGroup, ToggleGroupItem, Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/kit";
import { Colors, PopoverSideOffset } from "../constants";

type Props = {
    renderItem: (color: string) => React.ReactNode;

    title: string;

    placeholder: React.ReactNode;

    onSelect: (color: string) => void;
};

export function ColorsDropdown({ renderItem, title, onSelect, placeholder }: Props) {
    return (
        <Popover>
            <PopoverTrigger className="cursor-pointer">
                <Tooltip>
                    <TooltipTrigger asChild>{placeholder}</TooltipTrigger>

                    <TooltipContent>{title}</TooltipContent>
                </Tooltip>
            </PopoverTrigger>

            <PopoverContent className="w-[176px] p-0" sideOffset={PopoverSideOffset}>
                <ToggleGroup type="single" variant="default" className="w-full grid!">
                    <div className="grid grid-cols-4">
                        {Colors.map(color => (
                            <ToggleGroupItem key={color} value={color} className="cursor-pointer p-1!" onClick={onSelect.bind(null, color)}>
                                {renderItem(color)}
                            </ToggleGroupItem>
                        ))}
                    </div>
                </ToggleGroup>
            </PopoverContent>
        </Popover>
    );
}
