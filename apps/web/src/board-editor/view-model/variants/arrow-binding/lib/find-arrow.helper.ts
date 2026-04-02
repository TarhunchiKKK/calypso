import type { ViewModelParams } from "@/board-editor/view-model/types";
import type { ArrowNode } from "@repo/boards-common";
import type { Id } from "@repo/common";

export function findArrow(nodesModel: ViewModelParams["nodesModel"], arrowId: Id) {
    const arrow = nodesModel.nodes.find(node => node.id === arrowId);

    if (!arrow) {
        throw new Error(`Arrow to resize not found, id=${arrowId}`);
    }

    if (arrow.type !== "arrow") {
        throw new Error(`Binding node is not an arrow, id=${arrowId}`);
    }

    return arrow as ArrowNode;
}
