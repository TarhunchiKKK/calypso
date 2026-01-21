import { ALargeSmall, Square, SquareDashed, SquareRoundCorner, TextAlignStart, Type } from "lucide-react";
import type { BooleanFields } from "@/shared/lib/typescript";
import { HorizontalDropdown, NumericDropdown, Wrapper } from "@/shared/ui";
import type { NodeStyles } from "../types";
import { BlockToggles } from "./block-toggles.component";
import { ColorsDropdown } from "./colors-dropdown.component";
import { BorderRadiuses, BorderStyles, FontSizes, PopoverSideOffset, TextAligns } from "./constants";
import { FontFamilyDropdown } from "./font-family-dropdown.component";

type Props = Partial<BooleanFields<NodeStyles>>;

export function StylesPanel(props: Props) {
    return (
        <Wrapper className="flex flex-row justify-between items-center gap-4 px-2 py-1">
            {props.fontFamily && <FontFamilyDropdown />}

            {props.fontSize && <NumericDropdown value={null} placeholder={<ALargeSmall className="dark:text-white" />} items={FontSizes} />}

            {props.textAlign && (
                <HorizontalDropdown items={TextAligns} placeholder={<TextAlignStart className="dark:text-white" />} popoverOffset={PopoverSideOffset} />
            )}

            {props.backgroundColor && <ColorsDropdown renderItem={backgroundColor => <div className="w-5 h-5 rounded-full" style={{ backgroundColor }} />} />}

            {props.color && <ColorsDropdown renderItem={color => <Type style={{ color }} />} />}

            {props.borderColor && <ColorsDropdown renderItem={color => <Square style={{ color }} />} />}

            {props.borderRadius && <NumericDropdown value={null} placeholder={<SquareRoundCorner className="dark:text-white" />} items={BorderRadiuses} />}

            {props.borderStyle && (
                <HorizontalDropdown items={BorderStyles} placeholder={<SquareDashed className="dark:text-white" />} popoverOffset={PopoverSideOffset} />
            )}

            <BlockToggles />
        </Wrapper>
    );
}
