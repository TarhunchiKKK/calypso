import type { NodeBase } from "@repo/boards-common";
import type { Point } from "@repo/common";
import { BindingPoints } from "./binding-points.component";
import type { BindingNodeHandlers } from "./types";

export abstract class NodeBindingStrategy<T extends NodeBase = NodeBase> {
    public abstract getReferencePoints(node: T): Point[];

    public ui(node: T, handler: BindingNodeHandlers["onMouseUp"]) {
        const referencePoints = this.getReferencePoints(node);

        const handlerWithNode = (e: React.MouseEvent) => {
            handler({
                relativeTo: node.id,
                x: e.currentTarget.clientLeft,
                y: e.currentTarget.clientTop
            });
        };

        return <BindingPoints referencePoints={referencePoints} onMouseUp={handlerWithNode} />;
    }
}
