import type { NodeStyles } from "@repo/boards";
import { Square, SquareDashed, SquareDot, SquareRoundCorner } from "lucide-react";
import { AvailableBorderRadiuses, DefaultNodeStyles } from "@/entities/nodes";
import type { DropdownItem } from "@/shared/ui";
import { ColorsDropdownItemSizes } from "../../lib/ui.constants";

export const BorderStylePlaceholder = <SquareDashed className="dark:text-white" />;

export const BorderColorPlaceholder = <Square style={{ color: DefaultNodeStyles.borderColor }} />;

export const BoarderRadiusPlaceholder = <SquareRoundCorner className="dark:text-white" />;

export const renderBorderRadiusItem = (color: string) => <Square style={{ color, ...ColorsDropdownItemSizes }} />;

export const BorderStyles: DropdownItem<Required<NodeStyles>["borderStyle"]>[] = [
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
                None
            </>
        ),
        value: "solid"
    },
    {
        label: (
            <>
                <SquareDot />
                None
            </>
        ),
        value: "dotted"
    },
    {
        label: (
            <>
                <SquareDashed />
                None
            </>
        ),
        value: "dashed"
    }
];

export const BorderRadiuses: DropdownItem<NodeStyles["borderRadius"]>[] = AvailableBorderRadiuses.map((borderRadius) => ({
    label: borderRadius > 1000 ? "Full" : `${borderRadius}px`,
    value: borderRadius
}));
