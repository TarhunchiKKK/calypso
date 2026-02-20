import type { NodeStyles } from "@repo/common";
import { Square, SquareDashed, SquareDot, SquareRoundCorner } from "lucide-react";
import type { DropdownItem } from "@/shared/ui";
import { Colors } from "./colors.constants";

export const BorderStylePlaceholder = <SquareDashed className="dark:text-white" />;

export const BorderColorPlaceholder = <Square style={{ color: Colors[0] }} />;

export const BorderRadiusPlaceholder = <SquareRoundCorner className="dark:text-white" />;

export const BorderStyles: DropdownItem<Required<NodeStyles>["borderStyle"]>[] = [
    {
        label: (
            <>
                <Square className="text-transparent" />
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

export const BorderRadiuses: DropdownItem<NodeStyles["borderRadius"]>[] = [
    {
        label: "None",
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
