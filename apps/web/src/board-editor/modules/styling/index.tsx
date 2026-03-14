"use client";

import { Wrapper } from "@/shared/ui";
import { Separator } from "@/shared/ui/kit";
import { BorderStylesGroup } from "./compose/border-styles-group.component";
import { ColorsGroup } from "./compose/colors-group.component";
import { FontStylesGroup } from "./compose/font-styles-group.component";
import { TextFormattingGroup } from "./compose/text-formatting-group.component";
import type { UpdateFn } from "./lib/types";

type Props = {
    onUpdate: (fn: UpdateFn) => void;
};

export function StylesBar({ onUpdate }: Props) {
    return (
        <Wrapper className="flex flex-row justify-between items-center gap-4 px-4 py-3">
            <FontStylesGroup onUpdate={onUpdate} />

            <Separator orientation="vertical" className="h-5!" />

            <ColorsGroup onUpdate={onUpdate} />

            <Separator orientation="vertical" className="h-5!" />

            <BorderStylesGroup onUpdate={onUpdate} />

            <Separator orientation="vertical" className="h-5!" />

            <TextFormattingGroup onUpdate={onUpdate} />
        </Wrapper>
    );
}
