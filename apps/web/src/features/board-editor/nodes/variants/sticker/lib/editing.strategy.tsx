import type { StickerNode } from "@repo/common";
import { NodeEditingStrategy } from "@/features/board-editor/modules/editing";
import { TextareaAutoSize } from "@/shared/ui";

export class EditStickerNodeStrategy extends NodeEditingStrategy {
    public override ui(node: StickerNode) {
        const onEditingEnd = (text: string) => {
            this.handler({ ...node, text: text } as StickerNode);
        };

        return <TextareaAutoSize value={node.text} onEditingEnd={onEditingEnd} />;
    }
}
