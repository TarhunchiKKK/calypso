"use client";

import type { Descendant } from "slate";
import { FormatableTextarea } from "@/shared/ui/formatable-input";

const value: Descendant[] = [
    {
        type: "paragraph",
        children: [{ text: "A line of text in a paragraph.", lineThrough: true }]
    },
    {
        type: "paragraph",
        children: [{ text: "A line of text in a paragraph.", italic: true }]
    },
    {
        type: "paragraph",
        children: [{ text: "A line of text in a paragraph.", bold: true, underline: true }]
    }
];

export default function TempPage() {
    return (
        <div className="absolute top-1/3 left-1/3 w-[400px] border-2 border-red-600">
            <FormatableTextarea value={value} />
        </div>
    );
}
