import type { NodeStyles } from "@repo/boards-common";
import { FoldHorizontal, Minus } from "lucide-react";
import { AvailableLineWidths, DefaultNodeStyles } from "@/entities/nodes";
import type { DropdownItem } from "@/shared/ui";

export const LineWidthPlaceholder = <FoldHorizontal className="dark:text-white" />;

export const LineColorPlaceholder = <Minus style={{ color: DefaultNodeStyles.lineColor }} />;

export const LineTypePlaceholder = <Minus />;

export const renderLineColorItem = (color: string) => <Minus style={{ color: color, width: "100%" }} />;

export const LineWidths: DropdownItem<NodeStyles["lineWidth"]>[] = AvailableLineWidths.map((lineWidth) => ({
    label: <div style={{ width: "100%", height: lineWidth }} className="bg-primary" />,
    value: lineWidth
}));

export const LineTypes: DropdownItem<NodeStyles["lineType"]>[] = [
    {
        label: "Solid",
        value: "solid"
    },
    {
        label: "Dotted",
        value: "dotted"
    },
    {
        label: "Dashed",
        value: "dashed"
    }
];
