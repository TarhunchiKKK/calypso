import type { NodeBase, StickerNode } from "@repo/boards-common";
import type { Decoratable } from "@/board-editor/core";
import { NodeEditingStrategy } from "@/board-editor/modules/editing";
import { TextareaAutoSize } from "@/shared/ui";

export class StickerEditingStrategy extends NodeEditingStrategy {
    public override ui(node: Decoratable<StickerNode>, handler: (node: NodeBase) => void) {
        const handleEditingEnd = (text: string) => {
            const newNode = {
                ...node.data,
                text: text
            };

            handler(newNode);
        };

        return <TextareaAutoSize value={node.data.text} onEditingEnd={handleEditingEnd} />;
    }
}
