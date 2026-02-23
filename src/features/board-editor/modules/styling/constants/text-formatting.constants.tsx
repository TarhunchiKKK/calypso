import { TextAlignCenter, TextAlignEnd, TextAlignJustify, TextAlignStart } from "lucide-react";
import type { DropdownItem } from "@/shared/ui";
import type { NodeStyles } from "@/features/board-editor/core";

export const TextAligns: DropdownItem<NodeStyles["textAlign"]>[] = [
    {
        value: "left",
        label: <TextAlignStart />
    },
    {
        value: "center",
        label: <TextAlignCenter />
    },
    {
        value: "right",
        label: <TextAlignEnd />
    },
    {
        value: "justify",
        label: <TextAlignJustify />
    }
];
