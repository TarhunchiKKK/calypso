import type { NodeStyles } from "@repo/boards";
import { FoldHorizontal, Minus } from "lucide-react";
import { DefaultNodeStyles } from "@/entities/nodes";
import { capitalize } from "@/shared/lib/string";
import type { DropdownItem } from "@/shared/ui";

export const LineWidthPlaceholder = <FoldHorizontal className="dark:text-white" />;

export const LineColorPlaceholder = <Minus style={{ color: DefaultNodeStyles.lineColor }} />;

export const LineTypePlaceholder = <Minus />;

export const renderLineColorItem = (color: string) => <Minus style={{ color: color, width: "100%" }} />;

export function getLineWidths(values: NodeStyles["lineWidth"][]): DropdownItem<NodeStyles["lineWidth"]>[] {
    return values.map((value) => ({
        label: <div style={{ width: "100%", height: value }} className="bg-primary" />,
        value: value
    }));
}

export function getLineTypes(values: NodeStyles["lineType"][]): DropdownItem<NodeStyles["lineType"]>[] {
    return values.map((value) => ({
        label: capitalize(value),
        value: value
    }));
}
