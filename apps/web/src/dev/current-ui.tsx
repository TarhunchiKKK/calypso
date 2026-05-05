import { useState } from "react";
import { TextareaAutoFontSize } from "@/shared/ui";

// const initialValue: FormattableElement[] = [
//     {
//         children: [{ text: "Title" }],
//         type: "h3"
//     },
//     {
//         children: [
//             {
//                 children: [{ text: "This is a quote." }],
//                 type: "p"
//             }
//         ],
//         type: "blockquote"
//     },
//     {
//         children: [{ text: "With some " }, { bold: true, text: "bold", underline: true }, { text: " text for emphasis!" }],
//         type: "p"
//     }
// ];

export function CurrentUi() {
    const [value, setValue] = useState("");

    const handlers = {
        Escape: () => console.log("Escape")
    };

    return (
        <div className="w-80 h-80 border-2 border-red-400 p-2">
            <TextareaAutoFontSize value={value} onChange={setValue} keyHandlers={handlers} />
        </div>
    );

    // return <BoardEditor nodes={MockNodes} boardId="aaa" />;
}
