import { Square } from "lucide-react";
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
import type { Boards } from "@repo/common";

type Props = {
    onUpdate: (fn: UpdateFn) => void;
};

export function BorderStylesGroup({ onUpdate }: Props) {
    const handleBorderStyleSelect = (borderStyle: Boards.NodeStyles["borderStyle"]) => {
        onUpdate(node => ({
            ...node,
            styles: {
                ...node.styles,
                borderStyle
            }
        }));
    };

    const handleBorderColorSelect = (borderColor: Boards.NodeStyles["borderColor"]) => {
        onUpdate(node => ({
            ...node,
            styles: {
                ...node.styles,
                borderColor
            }
        }));
    };

    const handleBorderRadiusSelect = (borderRadius: Boards.NodeStyles["borderRadius"]) => {
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
