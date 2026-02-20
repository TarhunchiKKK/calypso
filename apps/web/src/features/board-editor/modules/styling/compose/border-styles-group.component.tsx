import type { NodeStyles } from "@repo/common";
import { Square, SquareDashed, SquareRoundCorner } from "lucide-react";
import { Dropdown } from "@/shared/ui";
import { BorderRadiuses, BorderStyles } from "../constants/border-styling.constants";
import { Colors } from "../constants/colors.constants";
import { ColorsDropdownItemSizes } from "../constants/ui.constants";
import type { UpdateFn } from "../types";
import { ColorsDropdown } from "../ui/colors-dropdown.component";
import { StylesGroupWrapper } from "../ui/styles-group-wrapper.component";

type Props = {
    onUpdate: (fn: UpdateFn) => void;
};

export function BorderStylesGroup({ onUpdate }: Props) {
    const handleBorderStyleSelect = (borderStyle: NodeStyles["borderStyle"]) => {
        onUpdate(node => ({
            ...node,
            styles: {
                ...node.styles,
                borderStyle
            }
        }));
    };

    const handleBorderColorSelect = (borderColor: NodeStyles["borderColor"]) => {
        onUpdate(node => ({
            ...node,
            styles: {
                ...node.styles,
                borderColor
            }
        }));
    };

    const handleBorderRadiusSelect = (borderRadius: NodeStyles["borderRadius"]) => {
        onUpdate(node => ({
            ...node,
            styles: {
                ...node.styles,
                borderRadius
            }
        }));
    };

    return (
        <StylesGroupWrapper>
            <Dropdown title="Border Style" items={BorderStyles} placeholder={<SquareDashed className="dark:text-white" />} onSelect={handleBorderStyleSelect} />

            <ColorsDropdown
                title="Border Color"
                placeholder={<Square style={{ color: Colors[0] }} />}
                colors={Colors}
                renderItem={color => <Square style={{ color, ...ColorsDropdownItemSizes }} />}
                onSelect={handleBorderColorSelect}
            />

            <Dropdown
                title="Border Radius"
                placeholder={<SquareRoundCorner className="dark:text-white" />}
                items={BorderRadiuses}
                onSelect={handleBorderRadiusSelect}
            />
        </StylesGroupWrapper>
    );
}
