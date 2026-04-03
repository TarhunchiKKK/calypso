import type { TextNode } from "@repo/boards-common";
import { NodeBindingStrategy } from "@/board-editor/modules/arrows-binding";

export class TextNodeBindingStrategy extends NodeBindingStrategy<TextNode> {
    public override getReferencePoints(node: TextNode) {
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
    }
}
