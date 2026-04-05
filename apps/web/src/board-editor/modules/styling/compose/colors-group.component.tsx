import type { NodeStyles } from "@repo/boards-common";
import { Type } from "lucide-react";
import { AvailableColors } from "@/entities/nodes/constants/available-node-styles.constants";
import { BackgroundColorPlaceholder, TextColorPlaceholder } from "../constants/placeholders.constants";
import { ColorsDropdownItemSizes } from "../constants/ui.constants";
import type { UpdateFn } from "../lib/types";
import { ColorsDropdown } from "../ui/colors-dropdown.component";
import { StylesGroupWrapper } from "../ui/styles-group-wrapper.component";

type Props = {
    onUpdate: (fn: UpdateFn) => void;
};

export function ColorsGroup({ onUpdate }: Props) {
    const handleBackgroundColorSelect = (backgroundColor: NodeStyles["backgroundColor"]) => {
        onUpdate(node => ({
            ...node,
            styles: {
                ...node.styles,
                backgroundColor
            }
        }));
    };

    const handleTextColorSelect = (color: NodeStyles["textColor"]) => {
        onUpdate(node => ({
            ...node,
            styles: {
                ...node.styles,
                color
            }
        }));
    };

    return (
        <StylesGroupWrapper>
            <ColorsDropdown
                title="Background"
                placeholder={BackgroundColorPlaceholder}
                colors={AvailableColors}
                renderItem={backgroundColor => <div className="w-5 h-5 rounded-full" style={{ backgroundColor, ...ColorsDropdownItemSizes }} />}
                onSelect={handleBackgroundColorSelect}
            />

            <ColorsDropdown
                title="Text Color"
                placeholder={TextColorPlaceholder}
                colors={AvailableColors}
                renderItem={color => <Type style={{ color, ...ColorsDropdownItemSizes }} />}
                onSelect={handleTextColorSelect}
            />
        </StylesGroupWrapper>
    );
}
