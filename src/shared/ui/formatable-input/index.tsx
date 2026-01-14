import type { OmitFields } from "@/shared/lib/typescript";
import { FormatableEditor, type FormatableEditorProps } from "./compose/formatable-editor.component";
import { FormatableDocumentKeyBindings, FormatableTextareaKeyBindings } from "./compose/key-bindings.constants";

export function FormatableTextarea({ value }: OmitFields<FormatableEditorProps, "keyBindings">) {
    return <FormatableEditor value={value} keyBindings={FormatableTextareaKeyBindings} />;
}

export function FormatableDocument({ value }: OmitFields<FormatableEditorProps, "keyBindings">) {
    return <FormatableEditor value={value} keyBindings={FormatableDocumentKeyBindings} />;
}
