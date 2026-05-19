import type { NodeStyles } from "@repo/boards";
import { TextAlignCenter, TextAlignEnd, TextAlignJustify, TextAlignStart } from "lucide-react";
import type { DropdownItem } from "@/shared/ui";

export const TextAlignPlaceholder = <TextAlignStart className="dark:text-white" />;

export const TextAligns: DropdownItem<NodeStyles["textAlign"]>[] = [
    {
        label: (
            <>
                <TextAlignStart />
                Left
            </>
        ),
        value: "left"
    },
    {
        value: "center",
        label: (
            <>
                <TextAlignCenter />
                Center
            </>
        )
    },
    {
        value: "right",
        label: (
            <>
                <TextAlignEnd />
                Right
            </>
        )
    },
    {
        value: "justify",
        label: (
            <>
                <TextAlignJustify />
                Justify
            </>
        )
    }
];
