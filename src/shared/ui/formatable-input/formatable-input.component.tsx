"use client";
import { type KeyboardEventHandler, useCallback, useState } from "react";
import { createEditor, type Descendant } from "slate";
import { Editable, type RenderElementProps, Slate, withReact } from "slate-react";
import { CustomEditor } from "./lib/custom-editor.facade";
import { CodeBlock, Paragraph } from "./ui";

const initialValue: Descendant[] = [
    {
        type: "paragraph",
        children: [{ text: "A line of text in a paragraph." }]
    },
    {
        type: "paragraph",
        children: [{ text: "A line of text in a paragraph." }]
    },
    {
        type: "paragraph",
        children: [{ text: "A line of text in a paragraph." }]
    }
];

const renderElement = (props: RenderElementProps) => {
    switch (props.element.type) {
        case "code":
            return <CodeBlock {...props} />;
        default:
            return <Paragraph {...props} />;
    }
};

export const FormatableInput = () => {
    const [editor] = useState(() => withReact(createEditor()));

    const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = useCallback(
        event => {
            if (!event.ctrlKey) {
                return;
            }

            switch (event.key) {
                case "`":
                    event.preventDefault();
                    CustomEditor.toggleCodeBlock(editor);
                    break;
                case "b":
                    event.preventDefault();
                    CustomEditor.toggleBoldMark(editor);
                    break;
                case "i":
                    event.preventDefault();
                    CustomEditor.toggleItalicMark(editor);
                    break;
                case "u":
                    event.preventDefault();
                    CustomEditor.toggleUnderlineMark(editor);
                    break;
                case "-":
                    event.preventDefault();
                    CustomEditor.toggleLineThroughMark(editor);
                    break;
            }
        },
        [editor]
    );

    return (
        <Slate editor={editor} initialValue={initialValue}>
            <Editable renderElement={renderElement} onKeyDown={keyDownHandler} />
        </Slate>
    );
};
