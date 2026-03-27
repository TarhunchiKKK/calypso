import { NodeEditingStrategy } from "@/board-editor/modules/editing";
import { TextareaAutoSize } from "@/shared/ui";
import type { Boards } from "@repo/common";

export class EditStickerNodeStrategy extends NodeEditingStrategy {
    public override ui(node: Boards.StickerNode) {
        const onEditingEnd = (text: string) => {
            this.handler({ ...node, text: text } as Boards.StickerNode);
        };

        return <TextareaAutoSize value={node.text} onEditingEnd={onEditingEnd} />;
    }
}
 