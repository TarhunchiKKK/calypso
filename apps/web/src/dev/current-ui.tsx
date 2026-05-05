import { BoardEditor } from "@/board-editor";
import { MockNodes } from "./mocks/nodes.mock";

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
    return <BoardEditor nodes={MockNodes} boardId="aaa" />;
}
