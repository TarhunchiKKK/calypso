import type { NodeStyles } from "@lib/boards";
import { ColorsDropdown } from "../../lib/colors-dropdown.component";
import type { ElementProps } from "../../lib/types";
import { BackgroundColorPlaceholder, renderBackgroundColorItem, renderTextColorItem, TextColorPlaceholder } from "./constants";

export function BackgroundColor({ values: colors, update }: ElementProps<"backgroundColor">) {
    const handleSelect = (backgroundColor: NodeStyles["backgroundColor"]) => {
        update((node) => ({
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
            colors={colors}
            renderItem={renderBackgroundColorItem}
            onSelect={handleSelect}
        />
    );
}

export function TextColor({ values: colors, update }: ElementProps<"textColor">) {
    const handleSelect = (color: NodeStyles["textColor"]) => {
        update((node) => ({
            ...node,
            styles: {
                ...node.styles,
                color
            }
        }));
    };

    return <ColorsDropdown title="Text Color" placeholder={TextColorPlaceholder} colors={colors} renderItem={renderTextColorItem} onSelect={handleSelect} />;
}
