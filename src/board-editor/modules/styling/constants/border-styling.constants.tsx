import { Square, SquareDashed, SquareDot } from "lucide-react";
import { AvailableBorderRadiuses, type NodeStyles } from "@/entities/nodes";
import type { DropdownItem } from "@/shared/ui";

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

export const BorderRadiuses: DropdownItem<NodeStyles["borderRadius"]>[] = AvailableBorderRadiuses.map(borderRadius => ({
    label: borderRadius > 1000 ? "Full" : `${borderRadius}px`,
    value: borderRadius
}));
