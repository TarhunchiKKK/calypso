import type { NodeStyles } from "@repo/boards-common";
import { AvailableColors } from "@/entities/nodes/constants/available-node-styles.constants";
import { Dropdown } from "@/shared/ui";
import { ColorsDropdown } from "../../lib/colors-dropdown.component";
import type { ElementProps } from "../../lib/types";
import { BoarderRadiusPlaceholder, BorderColorPlaceholder, BorderRadiuses, BorderStylePlaceholder, BorderStyles, renderBorderRadiusItem } from "./constants";

export function BorderStyle({ update }: ElementProps) {
    const handleSelect = (borderStyle: NodeStyles["borderStyle"]) => {
        update(node => ({
            ...node,
            styles: {
                ...node.styles,
                borderStyle
            }
        }));
    };

    return <Dropdown title="Border Style" items={BorderStyles} placeholder={BorderStylePlaceholder} onSelect={handleSelect} />;
}

export function BorderColor({ update }: ElementProps) {
    const handleSelect = (borderColor: NodeStyles["borderColor"]) => {
        update(node => ({
            ...node,
            styles: {
                ...node.styles,
                borderColor
            }
        }));
    };

    return (
        <ColorsDropdown
            title="Border Color"
            placeholder={BorderColorPlaceholder}
            colors={AvailableColors}
            renderItem={renderBorderRadiusItem}
            onSelect={handleSelect}
        />
    );
}

export function BorderRadius({ update }: ElementProps) {
    const handleSelect = (borderRadius: NodeStyles["borderRadius"]) => {
        update(node => ({
            ...node,
            styles: {
                ...node.styles,
                borderRadius
            }
        }));
    };

    return <Dropdown title="Border Radius" placeholder={BoarderRadiusPlaceholder} items={BorderRadiuses} onSelect={handleSelect} />;
}
