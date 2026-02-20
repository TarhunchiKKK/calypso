import type { NodeStyles } from "@repo/common";
import { TextAlignCenter, TextAlignEnd, TextAlignJustify, TextAlignStart } from "lucide-react";
import type { DropdownItem } from "@/shared/ui";

export const TextAlignPlaceholder = <TextAlignStart className="dark:text-white" />;

export const TextAligns: DropdownItem<NodeStyles["textAlign"]>[] = [
    {
        label: (
            <>
                <TextAlignStart className="dark:text-white" />
                Left
            </>
        ),
        value: "left"
    },
    {
        label: (
            <>
                <TextAlignCenter />
                Center
            </>
        ),
        value: "center"
    },
    {
        label: (
            <>
                <TextAlignEnd />
                Right
            </>
        ),
        value: "right"
    },
    {
        label: (
            <>
                <TextAlignJustify />
                Justify
            </>
        ),
        value: "justify"
    }
];
