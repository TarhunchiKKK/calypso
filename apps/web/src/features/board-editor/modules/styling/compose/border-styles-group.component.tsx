import type { NodeStyles } from "@repo/common";
import { Square } from "lucide-react";
import { Dropdown } from "@/shared/ui";
import { BorderColorPlaceholder, BorderRadiuses, BorderRadiusPlaceholder, BorderStylePlaceholder, BorderStyles } from "../constants/border-styling.constants";
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
            <Dropdown title="Border Style" items={BorderStyles} placeholder={BorderStylePlaceholder} onSelect={handleBorderStyleSelect} />

            <ColorsDropdown
                title="Border Color"
                placeholder={BorderColorPlaceholder}
                renderItem={color => <Square style={{ color, ...ColorsDropdownItemSizes }} />}
                onSelect={handleBorderColorSelect}
            />

            <Dropdown title="Border Radius" placeholder={BorderRadiusPlaceholder} items={BorderRadiuses} onSelect={handleBorderRadiusSelect} />
        </StylesGroupWrapper>
    );
}
