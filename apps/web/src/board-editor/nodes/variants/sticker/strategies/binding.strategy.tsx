import type { Boards } from "@repo/common";
import { NodeBindingStrategy } from "@/board-editor/modules/arrows-binding";

export class StickerBindingStrategy extends NodeBindingStrategy<Boards.StickerNode> {
    public override getReferencePoints() {
        return [
            { x: 0, y: 0 },
            { x: this.node.rect.width / 2, y: 0 },
            { x: this.node.rect.width, y: 0 },
            { x: this.node.rect.width, y: this.node.rect.height / 2 },
            { x: this.node.rect.width, y: this.node.rect.height },
            { x: this.node.rect.width / 2, y: this.node.rect.height },
            { x: 0, y: this.node.rect.height },
            { x: 0, y: this.node.rect.height / 2 }
        ];
    }
}
