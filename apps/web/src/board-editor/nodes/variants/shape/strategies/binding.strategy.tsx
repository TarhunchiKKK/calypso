import type { Boards } from "@repo/common";
import { BindingPoints, NodeBindingStrategy } from "@/board-editor/modules/arrows-binding";
import { ShapeVariantsReferencePointsMap } from "../lib/shape-variants-reference-points.map";

export class ShapeBindingStrategy extends NodeBindingStrategy<Boards.ShapeNode> {
    public override ui() {
        const referencePoints = ShapeVariantsReferencePointsMap[this.node.variant](this.node);

        return <BindingPoints referencePoints={referencePoints} />;
    }
}
