import type { StickerNode } from "@lib/boards";
import type { CSSProperties } from "react";
import type { Decoratable } from "@/board-editor/core";
import { type NodeEditingHandlers, NodeEditingStrategy } from "@/board-editor/modules/editing";
import { TextareaAutoFontSize } from "@/shared/ui";

export class StickerEditingStrategy extends NodeEditingStrategy {
    public override ui(node: Decoratable<StickerNode>, handlers: NodeEditingHandlers) {
        const handleChange = (value: string) => {
            const newNode = {
                ...node.data,
                text: value
            } satisfies StickerNode;

            handlers.change(newNode);
        };

        const textareaStyles: CSSProperties = {
            fontFamily: node.data.styles.fontFamily,
            color: node.data.styles.textColor,
            textAlign: node.data.styles.textAlign
        };

        return (
            <TextareaAutoFontSize value={node.data.text} onChange={handleChange} styles={textareaStyles} keyHandlers={this.getDefaultKeyHandlers(handlers)} />
        );
    }
}
