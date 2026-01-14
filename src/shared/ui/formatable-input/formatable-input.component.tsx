"use client";
import { useState } from "react";
import { createEditor, type Descendant } from "slate";
import { Editable, type RenderElementProps, Slate, withReact } from "slate-react";
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
        case "code": {
            return <CodeBlock {...props} />;
        }
        default: {
            return <Paragraph {...props} />;
        }
    }
};

export const FormatableInput = () => {
    const [editor] = useState(() => withReact(createEditor()));

    return (
        <Slate editor={editor} initialValue={initialValue}>
            <Editable renderElement={renderElement} />
        </Slate>
    );
};
