import type { NodeStyles } from "@repo/boards";
import { Square, SquareDashed, SquareDot, SquareRoundCorner } from "lucide-react";
import { DefaultNodeStyles } from "@/entities/nodes";
import type { DropdownItem } from "@/shared/ui";
import { ColorsDropdownItemSizes } from "../../lib/ui.constants";

export const BorderStylePlaceholder = <SquareDashed className="dark:text-white" />;

export const BorderColorPlaceholder = <Square style={{ color: DefaultNodeStyles.borderColor }} />;

export const BoarderRadiusPlaceholder = <SquareRoundCorner className="dark:text-white" />;

export const renderBorderRadiusItem = (color: string) => <Square style={{ color, ...ColorsDropdownItemSizes }} />;

const BorderStyles: DropdownItem<Required<NodeStyles>["borderStyle"]>[] = [
    {
        label: (
            <>
                <span></span>
                None
            </>
        ),
        value: "none"
    },
    {
        label: (
            <>
                <Square />
                Solid
            </>
        ),
        value: "solid"
    },
    {
        label: (
            <>
                <SquareDot />
                Dotted
            </>
        ),
        value: "dotted"
    },
    {
        label: (
            <>
                <SquareDashed />
                Dashed
            </>
        ),
        value: "dashed"
    }
];

export function getBorderStyles(values: NodeStyles["borderStyle"][]): DropdownItem<NodeStyles["borderStyle"]>[] {
    return BorderStyles.filter((item) => values.includes(item.value));
}

export function getBoarderRadiuses(values: NodeStyles["borderRadius"][]) {
    return values.map((borderRadius) => ({
        label: borderRadius > 1000 ? "Full" : `${borderRadius}px`,
        value: borderRadius
    }));
}
