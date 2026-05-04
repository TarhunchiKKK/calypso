import { BoldPlugin, ItalicPlugin, UnderlinePlugin } from "@platejs/basic-nodes/react";
import type { FormattableElement } from "@repo/common";
import { Plate, usePlateEditor } from "platejs/react";
import { Editor, EditorContainer } from "@/features/formatting/ui";

type Props = {
    value: FormattableElement[];

    onChange: (value: FormattableElement[]) => void;

    className?: string;
};

export function FormattableText({ value, onChange }: Props) {
    const editor = usePlateEditor({
        value: value,
        plugins: [BoldPlugin, ItalicPlugin, UnderlinePlugin]
    });

    return (
        <Plate editor={editor} onChange={data => onChange(data.value)}>
            <EditorContainer>
                <Editor placeholder="Type your amazing content here..." />
            </EditorContainer>
        </Plate>
    );
}
