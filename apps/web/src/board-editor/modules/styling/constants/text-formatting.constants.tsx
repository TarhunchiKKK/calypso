import type { NodeStyles } from "@repo/boards-common";
import { TextAlignCenter, TextAlignEnd, TextAlignJustify, TextAlignStart } from "lucide-react";
import type { DropdownItem } from "@/shared/ui";

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
