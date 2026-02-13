import type { NodeStyles } from "@repo/common";
import { ALargeSmall, Square, SquareDashed, SquareRoundCorner, TextAlignStart, Type } from "lucide-react";
import type { BooleanFields } from "@/shared/lib/typescript";
import { HorizontalDropdown, NumericDropdown, Wrapper } from "@/shared/ui";
import { BlockToggles } from "./block-toggles.component";
import { ColorsDropdown } from "./colors-dropdown.component";
import { BorderRadiuses, BorderStyles, FontSizes, PopoverSideOffset, TextAligns } from "./constants";
import { FontFamilyDropdown } from "./font-family-dropdown.component";

type Props = Partial<BooleanFields<NodeStyles>>;

export function StylesBar(props: Props) {
    return (
        <Wrapper className="flex flex-row justify-between items-center gap-4 px-2 py-1">
            {props.fontFamily && <FontFamilyDropdown />}

            {props.fontSize && <NumericDropdown title="Font Size" placeholder={<ALargeSmall className="dark:text-white" />} items={FontSizes} />}

            {props.textAlign && (
                <HorizontalDropdown
                    title="Text Align"
                    items={TextAligns}
                    placeholder={<TextAlignStart className="dark:text-white" />}
                    popoverOffset={PopoverSideOffset}
                />
            )}

            {props.backgroundColor && (
                <ColorsDropdown title="Background" renderItem={backgroundColor => <div className="w-5 h-5 rounded-full" style={{ backgroundColor }} />} />
            )}

            {props.color && <ColorsDropdown title="Text Color" renderItem={color => <Type style={{ color }} />} />}

            {props.borderColor && <ColorsDropdown title="Border Color" renderItem={color => <Square style={{ color }} />} />}

            {props.borderRadius && (
                <NumericDropdown title="Border Radius" placeholder={<SquareRoundCorner className="dark:text-white" />} items={BorderRadiuses} />
            )}

            {props.borderStyle && (
                <HorizontalDropdown
                    title="Border Style"
                    items={BorderStyles}
                    placeholder={<SquareDashed className="dark:text-white" />}
                    popoverOffset={PopoverSideOffset}
                />
            )}

            <BlockToggles />
        </Wrapper>
    );
}
