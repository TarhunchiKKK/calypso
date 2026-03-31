import type { Boards } from "@repo/common";
import { BindingPoints, NodeBindingStrategy } from "@/board-editor/modules/arrows-binding";

const getReferencePoints = (node: Boards.StickerNode) => {
    return [
        { x: 0, y: 0 },
        { x: node.rect.width / 2, y: 0 },
        { x: node.rect.width, y: 0 },
        { x: node.rect.width, y: node.rect.height / 2 },
        { x: node.rect.width, y: node.rect.height },
        { x: node.rect.width / 2, y: node.rect.height },
        { x: 0, y: node.rect.height },
        { x: 0, y: node.rect.height / 2 }
    ];
};

export class StickerBindingStrategy extends NodeBindingStrategy<Boards.StickerNode> {
    public override ui() {
        const referencePoints = getReferencePoints(this.node);

        return <BindingPoints referencePoints={referencePoints} />;
    }
}
