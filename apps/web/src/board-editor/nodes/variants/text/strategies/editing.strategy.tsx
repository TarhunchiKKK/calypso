import type { TextNode } from "@lib/boards";
import type { FormattableElement } from "@lib/common";
import type { Decoratable } from "@/board-editor/core";
import { type NodeEditingHandlers, NodeEditingStrategy } from "@/board-editor/modules/editing";
import { FormattableText } from "@/features/formattable-input";

export class TextNodeEditingStrategy extends NodeEditingStrategy {
    public override ui(node: Decoratable<TextNode>, handlers: NodeEditingHandlers) {
        const handleChange = (value: FormattableElement[], height?: number) => {
            const newNode = {
                ...node.data,
                rect: {
                    ...node.data.rect,
                    height: height ?? node.data.rect.height
                },
                content: value
            } satisfies TextNode;

            handlers.change(newNode);
        };

        return <FormattableText value={node.data.content} onChange={handleChange} keyHandlers={this.getDefaultKeyHandlers(handlers)} />;
    }
}
