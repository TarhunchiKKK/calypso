import type { RenderElementProps, RenderLeafProps } from "slate-react";
import { CodeBlock } from "./code-block.component";
import { Leaf } from "./leaf.component";
import { Paragraph } from "./paragraph.component";

export function renderElement(props: RenderElementProps) {
    switch (props.element.type) {
        case "paragraph":
            return <Paragraph {...props} />;
        case "code":
            return <CodeBlock {...props} />;
        default:
            throw new Error(`Unknown element: ${props.element}`);
    }
}

export function renderLeaf(props: RenderLeafProps) {
    return <Leaf {...props}/>
}
