import type { OmitFields } from "@repo/common";
import { FormatableEditor, type FormatableEditorProps } from "./compose/formatable-editor.component";
import { FormatableDocumentKeyBindings, FormatableTextareaKeyBindings } from "./compose/key-bindings.constants";

export function FormatableTextarea(props: OmitFields<FormatableEditorProps, "keyBindings">) {
    return <FormatableEditor {...props} keyBindings={FormatableTextareaKeyBindings} />;
}

export function FormatableDocument(props: OmitFields<FormatableEditorProps, "keyBindings">) {
    return <FormatableEditor {...props} keyBindings={FormatableDocumentKeyBindings} />;
}
