import type { Editor } from "slate";

export class CustomEditor {
    public static toggleBoldMark(editor: Editor) {
        console.log("bold");
    }

    public static toggleItalicMark(editor: Editor) {
        console.log("italic");
    }

    public static toggleUnderlineMark(editor: Editor) {
        console.log("underline");
    }

    public static toggleLineThroughMark(editor: Editor) {
        console.log("line-through");
    }

    public static toggleCodeBlock(editor: Editor) {
        console.log("code");
    }
}
