"use client";

import { ALargeSmall, Square, SquareDashed, SquareRoundCorner, TextAlignStart, Type } from "lucide-react";
import { HorizontalDropdown, NumericDropdown, Wrapper } from "@/shared/ui";
import { ColorsDropdown } from "./colors-dropdown.component";
import { BorderRadiuses, BorderStyles, FontSizes, PopoverSideOffset, TextAligns } from "./constants";
import { FontFamilyDropdown } from "./font-family-dropdown.component";
import type { UpdateFn } from "./types";

type Props = {
    onUpdate: (fn: UpdateFn) => void;
};

export function StylesBar({ onUpdate }: Props) {
    return (
        <Wrapper className="flex flex-row justify-between items-center gap-4 px-2 py-1">
            <FontFamilyDropdown onSelect={fontFamily => onUpdate(node => ({ ...node, styles: { ...node.styles, fontFamily } }))} />

            <NumericDropdown
                title="Font Size"
                placeholder={<ALargeSmall className="dark:text-white" />}
                items={FontSizes}
                onSelect={fontSize => onUpdate(node => ({ ...node, styles: { ...node.styles, fontSize } }))}
            />

            <HorizontalDropdown
                title="Text Align"
                items={TextAligns}
                placeholder={<TextAlignStart className="dark:text-white" />}
                popoverOffset={PopoverSideOffset}
            />

            <ColorsDropdown
                title="Background"
                onSelect={backgroundColor => onUpdate(node => ({ ...node, styles: { ...node.styles, backgroundColor } }))}
                renderItem={backgroundColor => <div className="w-5 h-5 rounded-full" style={{ backgroundColor }} />}
            />

            <ColorsDropdown
                title="Text Color"
                renderItem={color => <Type style={{ color }} />}
                onSelect={color => onUpdate(node => ({ ...node, styles: { ...node.styles, color } }))}
            />

            <ColorsDropdown
                title="Border Color"
                renderItem={color => <Square style={{ color }} />}
                onSelect={borderColor => onUpdate(node => ({ ...node, styles: { ...node.styles, borderColor } }))}
            />

            <NumericDropdown
                title="Border Radius"
                placeholder={<SquareRoundCorner className="dark:text-white" />}
                items={BorderRadiuses}
                onSelect={borderRadius => onUpdate(node => ({ ...node, styles: { ...node.styles, borderRadius } }))}
            />

            <HorizontalDropdown
                title="Border Style"
                items={BorderStyles}
                placeholder={<SquareDashed className="dark:text-white" />}
                popoverOffset={PopoverSideOffset}
            />

        </Wrapper>
    );
}
