import type { Boards } from "@repo/common";
import { NodeBindingStrategy } from "@/board-editor/modules/arrows-binding";
import { ShapeVariantsReferencePointsMap } from "../lib/shape-variants-reference-points.map";

export class ShapeBindingStrategy extends NodeBindingStrategy<Boards.ShapeNode> {
    public override getReferencePoints() {
        return ShapeVariantsReferencePointsMap[this.node.variant](this.node);
    }
}
