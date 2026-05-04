import { BoldPlugin, ItalicPlugin, UnderlinePlugin } from "@platejs/basic-nodes/react";
import type { FormattableElement } from "@repo/common";
import clsx from "clsx";
import { Plate, usePlateEditor } from "platejs/react";
import type { KeyboardEventHandler } from "react";
import { Editor, EditorContainer } from "@/features/formatting/ui";

type Props = {
    value: FormattableElement[];

    onChange?: (value: FormattableElement[]) => void;

    disabled?: boolean;

    className?: string;

    keyHandlers?: Record<string, () => void>;
};

export function FormattableText({ value, onChange, disabled, className, keyHandlers }: Props) {
    const editor = usePlateEditor({
        value: value,
        plugins: [BoldPlugin, ItalicPlugin, UnderlinePlugin]
    });

    const handleKeyDown: KeyboardEventHandler = e => {
        if (keyHandlers && e.key in keyHandlers) {
            e.preventDefault();

            keyHandlers[e.key]();
            
            return;
        }
    };

    return (
        <Plate editor={editor} onChange={data => onChange?.(data.value)}>
            <EditorContainer className={clsx("w-full h-max", className ?? className)}>
                <Editor placeholder="Type your amazing content here..." className="p-0!" disabled={disabled} onKeyDown={handleKeyDown} />
            </EditorContainer>
        </Plate>
    );
}
