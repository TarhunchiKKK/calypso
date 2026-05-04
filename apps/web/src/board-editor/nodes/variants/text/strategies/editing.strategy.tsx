import type { TextNode } from "@repo/boards-common";
import type { FormattableElement } from "@repo/common";
import type { Decoratable } from "@/board-editor/core";
import { type NodeEditingHandlers, NodeEditingStrategy } from "@/board-editor/modules/editing";
import { FormattableText } from "@/features/formatting";

export class TextNodeEditingStrategy extends NodeEditingStrategy {
    public override ui(node: Decoratable<TextNode>, handlers: NodeEditingHandlers) {
        const handleChange = (value: FormattableElement[]) => {
            const newNode = {
                ...node.data,
                content: value
            } satisfies TextNode;
            handlers.change(newNode);
        };

        return <FormattableText value={node.data.content} onChange={handleChange} onBlur={handlers.end} />;
    }
}
