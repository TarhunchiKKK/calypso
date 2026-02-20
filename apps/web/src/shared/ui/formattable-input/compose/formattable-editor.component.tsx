"use client";
import { type CSSProperties, type KeyboardEventHandler, useCallback, useState } from "react";
import { createEditor, type Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import type { KeyBindings } from "../types/key-bindings.types";
import { renderElement, renderLeaf } from "../ui";

export type FormattableEditorProps = {
    value: Descendant[];

    keyBindings: KeyBindings;

    onChange?: (value: Descendant[]) => void;

    onBlur?: () => void;

    style?: CSSProperties;

    className?: string;

    disabled?: boolean;
};

export const FormattableEditor = ({ value, keyBindings, onChange, onBlur, style, className, disabled }: FormattableEditorProps) => {
    const [editor] = useState(() => withReact(withHistory(createEditor())));

    const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = useCallback(
        event => {
            if (event.key === "Escape") {
                onBlur?.();
                return;
            }

            if (!event.ctrlKey) {
                return;
            }

            const handler = keyBindings[event.key];
            if (handler) {
                event.preventDefault();
                handler(editor);
            }
        },
        [editor, keyBindings, onBlur]
    );

    const changeHandler = useCallback(
        (value: Descendant[]) => {
            const isAstChange = editor.operations.some(op => "set_selection" !== op.type);

            if (isAstChange) {
                onChange?.(value);
            }
        },
        [onChange, editor.operations.some]
    );

    return (
        <Slate editor={editor} initialValue={value} onChange={changeHandler}>
            <Editable
                style={style}
                className={className}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={keyDownHandler}
                onBlur={onBlur}
                disabled={disabled}
            />
        </Slate>
    );
};
