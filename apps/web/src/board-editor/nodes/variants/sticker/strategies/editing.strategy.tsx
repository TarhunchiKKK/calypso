import type { StickerNode } from "@repo/boards-common";
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

        return <TextareaAutoFontSize value={node.data.text} onChange={handleChange} keyHandlers={this.getDefaultKeyHandlers(handlers)} />;
    }
}
