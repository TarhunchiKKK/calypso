/** biome-ignore-all lint/suspicious/noTsIgnore: <explanation> */
// @ts-nocheck
"use client";
import { useState } from "react";
import { createEditor, Editor, Element, Transforms } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";

// ---------------------------------------------------------------------------

const CustomEditor = {
    isBoldMarkActive(editor) {
        const marks = Editor.marks(editor);
        return marks ? marks.bold === true : false;
    },

    isCodeBlockActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === "code"
        });

        return !!match;
    },

    toggleBoldMark(editor) {
        const isActive = CustomEditor.isBoldMarkActive(editor);
        if (isActive) {
            Editor.removeMark(editor, "bold");
        } else {
            Editor.addMark(editor, "bold", true);
        }
    },

    toggleCodeBlock(editor) {
        const isActive = CustomEditor.isCodeBlockActive(editor);
        Transforms.setNodes(
            editor,
            { type: isActive ? null : "code" },
            { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
        );
    }
};

// ---------------------------------------------------------------------------

const renderElement = props => {
    switch (props.element.type) {
        case "code":
            return <CodeElement {...props} />;
        default:
            return <DefaultElement {...props} />;
    }
};

const renderLeaf = props => {
    return <Leaf {...props} />;
};

const initialValue = [
    {
        type: "paragraph",
        children: [{ text: "A line of text in a paragraph." }]
    }
];

export const FormatableInput = () => {
    const [editor] = useState(() => withReact(withHistory(createEditor())));

    return (
        <Slate editor={editor} initialValue={initialValue}>
            <div>
                <button
                    onMouseDown={event => {
                        event.preventDefault();
                        CustomEditor.toggleBoldMark(editor);
                    }}
                >
                    Bold
                </button>
                <button
                    onMouseDown={event => {
                        event.preventDefault();
                        CustomEditor.toggleCodeBlock(editor);
                    }}
                >
                    Code Block
                </button>
            </div>

            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={event => {
                    if (!event.ctrlKey) {
                        return;
                    }

                    switch (event.key) {
                        case "`": {
                            event.preventDefault();
                            CustomEditor.toggleCodeBlock(editor);
                            break;
                        }

                        case "b": {
                            event.preventDefault();
                            CustomEditor.toggleBoldMark(editor);
                            break;
                        }
                    }
                }}
            />
        </Slate>
    );
};

const CodeElement = props => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    );
};

const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = props => {
    return (
        <span {...props.attributes} style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}>
            {props.children}
        </span>
    );
};
