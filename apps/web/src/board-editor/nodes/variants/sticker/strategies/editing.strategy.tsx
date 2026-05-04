import type { StickerNode } from "@repo/boards-common";
import type { Decoratable } from "@/board-editor/core";
import { type NodeEditingHandlers, NodeEditingStrategy } from "@/board-editor/modules/editing";
import { TextareaAutoSize } from "@/shared/ui";

export class StickerEditingStrategy extends NodeEditingStrategy {
    public override ui(node: Decoratable<StickerNode>, handlers: NodeEditingHandlers) {
        const handleEditingEnd = (text: string) => {
            const newNode = {
                ...node.data,
                text: text
            };

            handlers.change(newNode);
            handlers.end();
        };

        return <TextareaAutoSize value={node.data.text} onEditingEnd={handleEditingEnd} />;
    }
}
