import type { FormattableElement } from "@repo/common";
import { FormattableDocument } from "@/features/formatting/variants/formattable-document.component";

const initialValue: FormattableElement[] = [
    {
        children: [{ text: "Title" }],
        type: "h3"
    },
    {
        children: [
            {
                children: [{ text: "This is a quote." }],
                type: "p"
            }
        ],
        type: "blockquote"
    },
    {
        children: [{ text: "With some " }, { bold: true, text: "bold", underline: true }, { text: " text for emphasis!" }],
        type: "p"
    }
];

export function CurrentUi() {
    return <FormattableDocument value={initialValue} onChange={() => {}} />;
}
