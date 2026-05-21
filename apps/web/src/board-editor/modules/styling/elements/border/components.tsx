import type { NodeStyles } from "@repo/boards";
import { Dropdown } from "@/shared/ui";
import { ColorsDropdown } from "../../lib/colors-dropdown.component";
import type { ElementProps } from "../../lib/types";
import {
    BoarderRadiusPlaceholder,
    BorderColorPlaceholder,
    BorderStylePlaceholder,
    getBoarderRadiuses,
    getBorderStyles,
    renderBorderRadiusItem
} from "./constants";

export function BorderStyle({ values, update }: ElementProps<"borderStyle">) {
    const borderStyles = getBorderStyles(values);

    const handleSelect = (borderStyle: NodeStyles["borderStyle"]) => {
        update((node) => ({
            ...node,
            styles: {
                ...node.styles,
                borderStyle
            }
        }));
    };

    return <Dropdown title="Border Style" items={borderStyles} placeholder={BorderStylePlaceholder} onSelect={handleSelect} />;
}

export function BorderColor({ values: colors, update }: ElementProps<"borderColor">) {
    const handleSelect = (borderColor: NodeStyles["borderColor"]) => {
        update((node) => ({
            ...node,
            styles: {
                ...node.styles,
                borderColor
            }
        }));
    };

    return (
        <ColorsDropdown title="Border Color" placeholder={BorderColorPlaceholder} colors={colors} renderItem={renderBorderRadiusItem} onSelect={handleSelect} />
    );
}

export function BorderRadius({ values, update }: ElementProps<"borderRadius">) {
    const borderRadiuses = getBoarderRadiuses(values);

    const handleSelect = (borderRadius: NodeStyles["borderRadius"]) => {
        update((node) => ({
            ...node,
            styles: {
                ...node.styles,
                borderRadius
            }
        }));
    };

    return <Dropdown title="Border Radius" placeholder={BoarderRadiusPlaceholder} items={borderRadiuses} onSelect={handleSelect} />;
}
