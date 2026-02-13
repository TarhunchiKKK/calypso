"use client";

import { ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { ToggleGroup, Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/kit";

type Props = {
    onClick: (blocked: boolean) => void;
};

export function LockToggles({ onClick }: Props) {
    return (
        <ToggleGroup type="single" variant="outline">
            <div className="flex flex-row justify-between items-center gap-1">
                <ToggleGroupItem value="lock" className="cursor-pointer">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <LockKeyhole onClick={onClick.bind(null, false)} />
                        </TooltipTrigger>

                        <TooltipContent>Lock</TooltipContent>
                    </Tooltip>
                </ToggleGroupItem>

                <ToggleGroupItem value="unlock" className="cursor-pointer">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <LockKeyholeOpen onClick={onClick.bind(null, true)} />
                        </TooltipTrigger>

                        <TooltipContent>Unlock</TooltipContent>
                    </Tooltip>
                </ToggleGroupItem>
            </div>
        </ToggleGroup>
    );
}
