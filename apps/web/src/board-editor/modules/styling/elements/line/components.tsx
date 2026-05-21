import type { NodeStyles } from "@repo/boards";
import { Dropdown } from "@/shared/ui";
import { ColorsDropdown } from "../../lib/colors-dropdown.component";
import type { ElementProps } from "../../lib/types";
import { getLineTypes, getLineWidths, LineColorPlaceholder, LineTypePlaceholder, LineWidthPlaceholder, renderLineColorItem } from "./constants";

export function LineWidth({ values, update }: ElementProps<"lineWidth">) {
    const lineWidths = getLineWidths(values);

    const handleSelect = (lineWidth: NodeStyles["lineWidth"]) => {
        update((node) => ({
            ...node,
            styles: {
                ...node.styles,
                lineWidth
            }
        }));
    };

    return <Dropdown title="Line Width" placeholder={LineWidthPlaceholder} items={lineWidths} onSelect={handleSelect} />;
}

export function LineColor({ values: colors, update }: ElementProps<"lineColor">) {
    const handleSelect = (lineColor: NodeStyles["lineColor"]) => {
        update((node) => ({
            ...node,
            styles: {
                ...node.styles,
                lineColor
            }
        }));
    };

    return <ColorsDropdown title="Line Color" placeholder={LineColorPlaceholder} colors={colors} renderItem={renderLineColorItem} onSelect={handleSelect} />;
}

export function LineType({ values, update }: ElementProps<"lineType">) {
    const lineTypes = getLineTypes(values);

    const handleSelect = (lineType: NodeStyles["lineType"]) => {
        update((node) => ({
            ...node,
            styles: {
                ...node.styles,
                lineType
            }
        }));
    };

    return <Dropdown title="Line Type" items={lineTypes} placeholder={LineTypePlaceholder} onSelect={handleSelect} />;
}
