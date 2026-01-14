import { Editor } from "slate";
import type { CustomText } from "../../../../../@types/slatejs";

export class CustomEditor {
    private static toggleMark(editor: Editor, mark: keyof Omit<CustomText, "text">) {
        const marks = Editor.marks(editor);

        const isMarkActive = marks ? marks[mark] : false;

        if (isMarkActive) {
            Editor.removeMark(editor, mark);
        } else {
            Editor.addMark(editor, mark, true);
        }
    }

    private static removeMark(editor: Editor, mark: keyof Omit<CustomText, "text">) {
        const marks = Editor.marks(editor);

        const isMarkActive = marks ? marks[mark] : false;

        if (isMarkActive) {
            Editor.removeMark(editor, mark);
        }
    }

    public static toggleBoldMark(editor: Editor) {
        CustomEditor.toggleMark(editor, "bold");
    }

    public static toggleItalicMark(editor: Editor) {
        CustomEditor.toggleMark(editor, "italic");
    }

    public static toggleUnderlineMark(editor: Editor) {
        CustomEditor.removeMark(editor, "lineThrough");
        CustomEditor.toggleMark(editor, "underline");
    }

    public static toggleLineThroughMark(editor: Editor) {
        CustomEditor.removeMark(editor, "underline");
        CustomEditor.toggleMark(editor, "lineThrough");
    }

    public static toggleCodeBlock(editor: Editor) {
        console.log("code");
    }
}
