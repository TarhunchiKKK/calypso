import { Editor, Element, Transforms } from "slate";
import type { CustomElement } from "@/types/slate";
import type { TextMarks } from "../types/text-marks.types";

export class CustomEditor {
    private static toggleMark(editor: Editor, mark: TextMarks) {
        const marks = Editor.marks(editor);

        const isMarkActive = marks ? marks[mark] : false;

        if (isMarkActive) {
            Editor.removeMark(editor, mark);
        } else {
            Editor.addMark(editor, mark, true);
        }
    }

    private static removeMark(editor: Editor, mark: TextMarks) {
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
        const [match] = Editor.nodes(editor, {
            match: n => (n as CustomElement).type === "code"
        });

        const isActive = !!match;

        Transforms.setNodes(editor, { type: isActive ? undefined : "code" }, { match: n => Element.isElement(n) && Editor.isBlock(editor, n) });
    }
}
