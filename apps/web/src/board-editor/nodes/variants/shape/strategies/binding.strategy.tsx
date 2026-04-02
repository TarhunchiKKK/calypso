import type { ShapeNode } from "@repo/boards-common";
import { NodeBindingStrategy } from "@/board-editor/modules/arrows-binding";
import { ShapeVariantsReferencePointsMap } from "../lib/shape-variants-reference-points.map";

export class ShapeBindingStrategy extends NodeBindingStrategy<ShapeNode> {
    public override getReferencePoints(node: ShapeNode) {
        return ShapeVariantsReferencePointsMap[node.variant](node);
    }
}
