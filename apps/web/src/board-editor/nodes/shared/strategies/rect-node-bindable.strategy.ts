import type { TextNode } from "@lib/boards";
import type { Point } from "@lib/common";
import { BindableNodeStrategy } from "@/board-editor/modules/arrows-binding";

const referencePoints: Point[] = [
    { x: 0, y: 0 },
    { x: 0.5, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 0.5 },
    { x: 1, y: 1 },
    { x: 0.5, y: 1 },
    { x: 0, y: 1 },
    { x: 0, y: 0.5 }
];

export class BindableRectNodeStrategy extends BindableNodeStrategy<TextNode> {
    public override getReferencePoints() {
        return referencePoints;
    }
}
