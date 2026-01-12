import { EditNodeStrategy } from "@/features/board-editor/modules/editing";
import { StickerNode } from "../type";
import { TextareaAutoSize } from "@/shared/ui";

export class EditStickerNodeStrategy extends EditNodeStrategy<StickerNode> {
    public override ui(node: StickerNode) {
        const onEditingEnd = (text: string) => {
            this.handler({ ...node, text: text });
        };

        return <TextareaAutoSize value={node.text} onEditingEnd={onEditingEnd} />;
    }
}
