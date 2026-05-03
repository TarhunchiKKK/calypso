import { useCallback, useState } from "react";
import { createEditor, type Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import { renderElement, renderLeaf } from "../ui";

type Props = {
    value: Descendant[];

    onChange?: (value: Descendant[]) => void;
}

export function FormatableText({value,onChange}: Props) {
    const [editor] = useState(() => withReact(withHistory(createEditor())))

    const handleChange = useCallback(
            (value: Descendant[]) => {
                const isAstChange = editor.operations.some(op => "set_selection" !== op.type);
    
                if (isAstChange) {
                    onChange?.(value);
                }
            },
            [onChange, editor.operations.some]
        );

    return (
        <Slate editor={editor} initialValue={value} onChange={handleChange}>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
            />
        </Slate>
    )
}