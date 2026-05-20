import type { NodeStyles } from "@repo/boards";
import { AvailableColors } from "@/entities/nodes";
import { Dropdown } from "@/shared/ui";
import { ColorsDropdown } from "../../lib/colors-dropdown.component";
import type { ElementProps } from "../../lib/types";
import { LineColorPlaceholder, LineTypePlaceholder, LineTypes, LineWidthPlaceholder, LineWidths, renderLineColorItem } from "./constants";

export function LineWidth({ update }: ElementProps) {
    const handleSelect = (lineWidth: NodeStyles["lineWidth"]) => {
        update((node) => ({
            ...node,
            styles: {
                ...node.styles,
                lineWidth
            }
        }));
    };

    return <Dropdown title="Line Width" placeholder={LineWidthPlaceholder} items={LineWidths} onSelect={handleSelect} />;
}

export function LineColor({ update }: ElementProps) {
    const handleSelect = (lineColor: NodeStyles["lineColor"]) => {
        update((node) => ({
            ...node,
            styles: {
                ...node.styles,
                lineColor
            }
        }));
    };

    return (
        <ColorsDropdown
            title="Line Color"
            placeholder={LineColorPlaceholder}
            colors={AvailableColors}
            renderItem={renderLineColorItem}
            onSelect={handleSelect}
        />
    );
}

export function LineType({ update }: ElementProps) {
    const handleSelect = (lineType: NodeStyles["lineType"]) => {
        update((node) => ({
            ...node,
            styles: {
                ...node.styles,
                lineType
            }
        }));
    };

    return <Dropdown title="Line Type" items={LineTypes} placeholder={LineTypePlaceholder} onSelect={handleSelect} />;
}
