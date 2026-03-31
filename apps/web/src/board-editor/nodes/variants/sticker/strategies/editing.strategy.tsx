import type { Boards } from "@repo/common";
import { NodeEditingStrategy } from "@/board-editor/modules/editing";
import { TextareaAutoSize } from "@/shared/ui";

export class StickerEditingStrategy extends NodeEditingStrategy {
    public override ui(node: Boards.StickerNode) {
        const onEditingEnd = (text: string) => {
            this.handler({ ...node, text: text } as Boards.StickerNode);
        };

        return <TextareaAutoSize value={node.text} onEditingEnd={onEditingEnd} />;
    }
}
