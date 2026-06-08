import type { NodeStyles } from "@lib/boards";
import { TextAlignCenter, TextAlignEnd, TextAlignJustify, TextAlignStart } from "lucide-react";
import type { DropdownItem } from "@/shared/ui";

export const TextAlignPlaceholder = <TextAlignStart className="dark:text-white" />;

const TextAligns: DropdownItem<NodeStyles["textAlign"]>[] = [
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

export function getTextAligns(values: NodeStyles["textAlign"][]): DropdownItem<NodeStyles["textAlign"]>[] {
    return TextAligns.filter((texftAlign) => values.includes(texftAlign.value));
}
