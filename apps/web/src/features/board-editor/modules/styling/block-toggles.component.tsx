"use client";

import { ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { ToggleGroup, Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/kit";

export function BlockToggles() {
    return (
        <ToggleGroup type="single" variant="outline">
            <div className="flex flex-row justify-between items-center gap-1">
                <ToggleGroupItem value="lock" className="cursor-pointer">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <LockKeyhole />
                        </TooltipTrigger>

                        <TooltipContent>Lock</TooltipContent>
                    </Tooltip>
                </ToggleGroupItem>

                <ToggleGroupItem value="unlock" className="cursor-pointer">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <LockKeyholeOpen />
                        </TooltipTrigger>

                        <TooltipContent>Unlock</TooltipContent>
                    </Tooltip>
                </ToggleGroupItem>
            </div>
        </ToggleGroup>
    );
}
