import type { NodeStyles } from "@repo/boards";
import { MousePointer2 } from "lucide-react";
import type { DropdownItem } from "@/shared/ui";

export const AngleTypePlaceholder = <MousePointer2 className="rotate-90" />;

export const AngleTypes: DropdownItem<NodeStyles["angleType"]>[] = [
    {
        label: "Triangle",
        value: "triangle"
    },
    {
        label: "Triangle Filled",
        value: "triangle-filled"
    },
    {
        label: "Corner",
        value: "corner"
    },
    {
        label: "Kite",
        value: "kite"
    },
    {
        label: "Kite Filled",
        value: "kite-filled"
    }
];
