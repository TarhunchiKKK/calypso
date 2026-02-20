import { Square, SquareDashed, SquareRoundCorner } from "lucide-react";
import { HorizontalDropdown, NumericDropdown } from "@/shared/ui";
import { BorderRadiuses, BorderStyles, Colors, ColorsDropdownItemSizes, PopoverSideOffset } from "../constants";
import type { UpdateFn } from "../types";
import { ColorsDropdown } from "../ui/colors-dropdown.component";
import { StylesGroupWrapper } from "./styles-group-wrapper.component";

type Props = {
    onUpdate: (fn: UpdateFn) => void;
};

export function BorderStylesGroup({ onUpdate }: Props) {
    return (
        <StylesGroupWrapper>
            <HorizontalDropdown
                title="Border Style"
                items={BorderStyles}
                placeholder={<SquareDashed className="dark:text-white" />}
                popoverOffset={PopoverSideOffset}
            />

            <ColorsDropdown
                title="Border Color"
                placeholder={<Square style={{ color: Colors[0] }} />}
                renderItem={color => <Square style={{ color, ...ColorsDropdownItemSizes }} />}
                onSelect={borderColor => onUpdate(node => ({ ...node, styles: { ...node.styles, borderColor } }))}
            />

            <NumericDropdown
                title="Border Radius"
                placeholder={<SquareRoundCorner className="dark:text-white" />}
                items={BorderRadiuses}
                onSelect={borderRadius => onUpdate(node => ({ ...node, styles: { ...node.styles, borderRadius } }))}
            />
        </StylesGroupWrapper>
    );
}
