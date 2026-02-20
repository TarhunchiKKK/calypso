import type { KeyBindings } from "../types/key-bindings.types";
import { CustomEditor } from "./custom-editor.facade";

export const TextareaKeyBindings: KeyBindings = {
    b: editor => CustomEditor.toggleBoldMark(editor),
    i: editor => CustomEditor.toggleItalicMark(editor),
    u: editor => CustomEditor.toggleUnderlineMark(editor),
    "-": editor => CustomEditor.toggleLineThroughMark(editor)
};

export const DocumentKeyBindings: KeyBindings = {
    ...TextareaKeyBindings,
    "`": editor => CustomEditor.toggleCodeBlock(editor)
};
