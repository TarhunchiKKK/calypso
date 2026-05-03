import type { AnyFormatableElement } from "@repo/common";
import { Editor, Element, Transforms } from "slate";
import type { TextMarks } from "../types";

export class FormatableEditor {
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
        FormatableEditor.toggleMark(editor, "bold");
    }

    public static toggleItalicMark(editor: Editor) {
        FormatableEditor.toggleMark(editor, "italic");
    }

    public static toggleUnderlineMark(editor: Editor) {
        FormatableEditor.removeMark(editor, "lineThrough");
        FormatableEditor.toggleMark(editor, "underline");
    }

    public static toggleLineThroughMark(editor: Editor) {
        FormatableEditor.removeMark(editor, "underline");
        FormatableEditor.toggleMark(editor, "lineThrough");
    }

    public static toggleCodeBlock(editor: Editor) {
        const [match] = Editor.nodes(editor, {
            match: n => (n as AnyFormatableElement).type === "code"
        });

        const isActive = !!match;

        Transforms.setNodes(editor, { type: isActive ? undefined : "code" }, { match: n => Element.isElement(n) && Editor.isBlock(editor, n) });
    }
}
