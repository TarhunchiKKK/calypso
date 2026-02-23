import type { RenderElementProps, RenderLeafProps } from "slate-react";
import { CodeBlock } from "./code-block.component";
import { Leaf } from "./leaf.component";
import { Paragraph } from "./paragraph.component";

export function renderElement(props: RenderElementProps) {
    switch (props.element.type) {
        case "code":
            return <CodeBlock {...props} />;
        default:
            return <Paragraph {...props} />;
    }
}

export const renderLeaf = (props: RenderLeafProps) => {
    return <Leaf {...props} />;
};
