import type { ShapeNode } from "@repo/boards-common";
import { BindableNodeStrategy } from "@/board-editor/modules/arrows-binding";
import { ShapeVariantsReferencePointsMap } from "../lib/shape-variants-reference-points.map";

export class BindableShapeStrategy extends BindableNodeStrategy<ShapeNode> {
    public override getReferencePoints(node: ShapeNode) {
        return ShapeVariantsReferencePointsMap[node.variant];
    }
}
