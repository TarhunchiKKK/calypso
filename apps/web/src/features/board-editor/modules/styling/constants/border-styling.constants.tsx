import type { NodeStyles } from "@repo/common";
import { Square, SquareDashed, SquareDot } from "lucide-react";
import type { DropdownItem } from "@/shared/ui";

export const BorderRadiuses: DropdownItem<NodeStyles["borderRadius"]>[] = [
    {
        label: "none",
        value: 0
    },
    {
        label: "4px",
        value: 4
    },
    {
        label: "8px",
        value: 8
    },
    {
        label: "16px",
        value: 16
    },
    {
        label: "24px",
        value: 24
    },
    {
        label: "Full",
        value: 9999
    }
];

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
