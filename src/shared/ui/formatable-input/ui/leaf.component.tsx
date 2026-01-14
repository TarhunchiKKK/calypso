import type { CSSProperties } from "react";
import type { RenderLeafProps } from "slate-react";

export function Leaf({ attributes, leaf, children }: RenderLeafProps) {
    const style: CSSProperties = {
        fontWeight: leaf.bold ? "bold" : "normal",
        fontStyle: leaf.italic ? "italic" : "normal",
        textDecoration: leaf.underline ? "underline" : leaf.lineThrough ? "line-through" : "none"
    };

    return (
        <span {...attributes} style={style}>
            {children}
        </span>
    );
}
