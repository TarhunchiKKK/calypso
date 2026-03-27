import { TextAlignCenter, TextAlignEnd, TextAlignJustify, TextAlignStart } from "lucide-react";
import type { DropdownItem } from "@/shared/ui";
import type { Boards } from "@repo/common";

export const TextAligns: DropdownItem<Boards.NodeStyles["textAlign"]>[] = [
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
