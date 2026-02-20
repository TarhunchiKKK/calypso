import type { OmitFields } from "@/shared/lib/typescript";
import { FormattableEditor, type FormattableEditorProps } from "./compose/formattable-editor.component";
import { DocumentKeyBindings, TextareaKeyBindings } from "./compose/key-bindings.constants";

export function Textarea(props: OmitFields<FormattableEditorProps, "keyBindings">) {
    return <FormattableEditor {...props} keyBindings={TextareaKeyBindings} />;
}

export function Document(props: OmitFields<FormattableEditorProps, "keyBindings">) {
    return <FormattableEditor {...props} keyBindings={DocumentKeyBindings} />;
}
