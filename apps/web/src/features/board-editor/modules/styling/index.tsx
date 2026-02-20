"use client";

import { TextAlignStart } from "lucide-react";
import { HorizontalDropdown, Wrapper } from "@/shared/ui";
import { Separator } from "@/shared/ui/kit";
import { BorderStylesGroup } from "./compose/border-styles-group.component";
import { ColorsGroup } from "./compose/colors-group.component";
import { FontStylesGroup } from "./compose/font-styles-group.component";
import { PopoverSideOffset, TextAligns } from "./constants";
import type { UpdateFn } from "./types";

type Props = {
    onUpdate: (fn: UpdateFn) => void;
};

export function StylesBar({ onUpdate }: Props) {
    return (
        <Wrapper className="flex flex-row justify-between items-center gap-2 px-2 py-1">
            <FontStylesGroup onUpdate={onUpdate} />

            <Separator orientation="vertical" className="h-5!" />

            <ColorsGroup onUpdate={onUpdate} />

            <Separator orientation="vertical" className="h-5!" />

            <BorderStylesGroup onUpdate={onUpdate} />

            <Separator orientation="vertical" className="h-5!" />

            <HorizontalDropdown
                title="Text Align"
                items={TextAligns}
                placeholder={<TextAlignStart className="dark:text-white" />}
                popoverOffset={PopoverSideOffset}
            />
        </Wrapper>
    );
}
