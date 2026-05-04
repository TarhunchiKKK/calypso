import { BoldPlugin, ItalicPlugin, UnderlinePlugin } from "@platejs/basic-nodes/react";
import type { FormattableElement } from "@repo/common";
import clsx from "clsx";
import { Plate, usePlateEditor } from "platejs/react";
import { Editor, EditorContainer } from "@/features/formatting/ui";

type Props = {
    value: FormattableElement[];

    onChange?: (value: FormattableElement[]) => void;

    onBlur?: () => void;

    disabled?: boolean;

    className?: string;
};

export function FormattableText({ value, onChange, onBlur, disabled, className }: Props) {
    const editor = usePlateEditor({
        value: value,
        plugins: [BoldPlugin, ItalicPlugin, UnderlinePlugin]
    });

    return (
        <Plate editor={editor} onChange={data => onChange?.(data.value)}>
            <EditorContainer onBlur={onBlur} className={clsx("w-full h-max", className ?? className)}>
                <Editor placeholder="Type your amazing content here..." className="p-0!" disabled={disabled} />
            </EditorContainer>
        </Plate>
    );
}
