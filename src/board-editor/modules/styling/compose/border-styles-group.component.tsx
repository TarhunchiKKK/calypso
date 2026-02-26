import { Square } from "lucide-react";
import type { NodeStyles } from "@/entities/nodes";
import { AvailableColors } from "@/entities/nodes/constants/available-node-styles.constants";
import { Dropdown } from "@/shared/ui";
import { BorderRadiuses, BorderStyles } from "../constants/border-styling.constants";
import {
    BoarderRadiusPlaceholder,
    BorderColorPlaceholder,
    BorderStylePlaceholder
} from "../constants/placeholders.constants";
import { ColorsDropdownItemSizes } from "../constants/ui.constants";
import type { UpdateFn } from "../lib/types";
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
            <Dropdown
                title="Border Style"
                items={BorderStyles}
                placeholder={BorderStylePlaceholder}
                onSelect={handleBorderStyleSelect}
            />

            <ColorsDropdown
                title="Border Color"
                placeholder={BorderColorPlaceholder}
                colors={AvailableColors}
                renderItem={color => <Square style={{ color, ...ColorsDropdownItemSizes }} />}
                onSelect={handleBorderColorSelect}
            />

            <Dropdown
                title="Border Radius"
                placeholder={BoarderRadiusPlaceholder}
                items={BorderRadiuses}
                onSelect={handleBorderRadiusSelect}
            />
        </StylesGroupWrapper>
    );
}
