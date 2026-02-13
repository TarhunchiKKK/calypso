"use client";

import type { NodeStyles } from "@repo/common";
import { ALargeSmall, Square, SquareDashed, SquareRoundCorner, TextAlignStart, Type } from "lucide-react";
import type { BooleanFields } from "@/shared/lib/typescript";
import { HorizontalDropdown, NumericDropdown, Wrapper } from "@/shared/ui";
import { LockToggles } from "./block-toggles.component";
import { ColorsDropdown } from "./colors-dropdown.component";
import { BorderRadiuses, BorderStyles, FontSizes, PopoverSideOffset, TextAligns } from "./constants";
import { FontFamilyDropdown } from "./font-family-dropdown.component";
import type { UpdateFn } from "./types";

type Props = Partial<BooleanFields<NodeStyles>> & { onUpdate: (fn: UpdateFn) => void };

export function StylesBar({ onUpdate, ...styles }: Props) {
    return (
        <Wrapper className="flex flex-row justify-between items-center gap-4 px-2 py-1">
            {styles.fontFamily && <FontFamilyDropdown onSelect={fontFamily => onUpdate(node => ({ ...node, styles: { ...node.styles, fontFamily } }))} />}

            {styles.fontSize && (
                <NumericDropdown
                    title="Font Size"
                    placeholder={<ALargeSmall className="dark:text-white" />}
                    items={FontSizes}
                    onSelect={fontSize => onUpdate(node => ({ ...node, styles: { ...node.styles, fontSize } }))}
                />
            )}

            {styles.textAlign && (
                <HorizontalDropdown
                    title="Text Align"
                    items={TextAligns}
                    placeholder={<TextAlignStart className="dark:text-white" />}
                    popoverOffset={PopoverSideOffset}
                />
            )}

            {styles.backgroundColor && (
                <ColorsDropdown
                    title="Background"
                    onSelect={backgroundColor => onUpdate(node => ({ ...node, styles: { ...node.styles, backgroundColor } }))}
                    renderItem={backgroundColor => <div className="w-5 h-5 rounded-full" style={{ backgroundColor }} />}
                />
            )}

            {styles.color && (
                <ColorsDropdown
                    title="Text Color"
                    renderItem={color => <Type style={{ color }} />}
                    onSelect={color => onUpdate(node => ({ ...node, styles: { ...node.styles, color } }))}
                />
            )}

            {styles.borderColor && (
                <ColorsDropdown
                    title="Border Color"
                    renderItem={color => <Square style={{ color }} />}
                    onSelect={borderColor => onUpdate(node => ({ ...node, styles: { ...node.styles, borderColor } }))}
                />
            )}

            {styles.borderRadius && (
                <NumericDropdown
                    title="Border Radius"
                    placeholder={<SquareRoundCorner className="dark:text-white" />}
                    items={BorderRadiuses}
                    onSelect={borderRadius => onUpdate(node => ({ ...node, styles: { ...node.styles, borderRadius } }))}
                />
            )}

            {styles.borderStyle && (
                <HorizontalDropdown
                    title="Border Style"
                    items={BorderStyles}
                    placeholder={<SquareDashed className="dark:text-white" />}
                    popoverOffset={PopoverSideOffset}
                />
            )}

            <LockToggles onClick={blocked => onUpdate(node => ({ ...node, blocked }))} />
        </Wrapper>
    );
}
