import { Square, SquareDashed, SquareDot } from "lucide-react";
import { AvailableBorderRadiuses, } from "@/entities/nodes";
import type { DropdownItem } from "@/shared/ui";
import type { Boards } from "@repo/common";

export const BorderStyles: DropdownItem<Required<Boards.NodeStyles>["borderStyle"]>[] = [
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

export const BorderRadiuses: DropdownItem<Boards.NodeStyles["borderRadius"]>[] = AvailableBorderRadiuses.map(borderRadius => ({
    label: borderRadius > 1000 ? "Full" : `${borderRadius}px`,
    value: borderRadius
}));
