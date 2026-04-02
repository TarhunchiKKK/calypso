import type { StickerNode } from "@repo/boards-common";
import { NodeBindingStrategy } from "@/board-editor/modules/arrows-binding";

export class StickerBindingStrategy extends NodeBindingStrategy<StickerNode> {
    public override getReferencePoints(node: StickerNode) {
        return [
            { x: 0, y: 0 },
            { x: node.rect.width / 2, y: 0 },
            { x: node.rect.width, y: 0 },
            { x: node.rect.width, y: node.rect.height / 2 },
            { x: node.rect.width, y: node.rect.height },
            { x: node.rect.width / 2, y: node.rect.height },
            { x: 0, y: node.rect.height },
            { x: 0, y: node.rect.height / 2 },
        ];
    }
}
