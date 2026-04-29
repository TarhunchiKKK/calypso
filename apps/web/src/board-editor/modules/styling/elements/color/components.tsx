import type { NodeStyles } from "@repo/boards-common";
import { AvailableColors } from "@/entities/nodes";
import { ColorsDropdown } from "../../lib/colors-dropdown.component";
import type { ElementProps } from "../../lib/types";
import { BackgroundColorPlaceholder, renderBackgroundColorItem, renderTextColorItem, TextColorPlaceholder } from "./constants";

export function BackgroundColor({ update }: ElementProps) {
    const handleSelect = (backgroundColor: NodeStyles["backgroundColor"]) => {
        update(node => ({
            ...node,
            styles: {
                ...node.styles,
                backgroundColor
            }
        }));
    };

    return (
        <ColorsDropdown
            title="Background"
            placeholder={BackgroundColorPlaceholder}
            colors={AvailableColors}
            renderItem={renderBackgroundColorItem}
            onSelect={handleSelect}
        />
    );
}

export function TextColor({ update }: ElementProps) {
    const handleSelect = (color: NodeStyles["textColor"]) => {
        update(node => ({
            ...node,
            styles: {
                ...node.styles,
                color
            }
        }));
    };

    return (
        <ColorsDropdown
            title="Text Color"
            placeholder={TextColorPlaceholder}
            colors={AvailableColors}
            renderItem={renderTextColorItem}
            onSelect={handleSelect}
        />
    );
}
