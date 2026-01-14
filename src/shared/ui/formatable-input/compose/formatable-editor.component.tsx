"use client";
import { type KeyboardEventHandler, useCallback, useState } from "react";
import { createEditor, type Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import type { KeyBindings } from "../types/key-bindings.types";
import { renderElement, renderLeaf } from "../ui";

export type FormatableEditorProps = {
    value: Descendant[];

    keyBindings: KeyBindings;
};

export const FormatableEditor = ({ value, keyBindings }: FormatableEditorProps) => {
    const [editor] = useState(() => withReact(withHistory(createEditor())));

    const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = useCallback(
        event => {
            if (!event.ctrlKey) {
                return;
            }

            const handler = keyBindings[event.key];
            if (handler) {
                event.preventDefault();
                handler(editor);
            }
        },
        [editor, keyBindings]
    );

    return (
        <Slate editor={editor} initialValue={value}>
            <Editable renderElement={renderElement} renderLeaf={renderLeaf} onKeyDown={keyDownHandler} />
        </Slate>
    );
};
