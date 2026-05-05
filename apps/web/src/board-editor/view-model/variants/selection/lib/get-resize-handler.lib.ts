import type { Id } from "@repo/common";
import type { ResizeDirection } from "@/board-editor/modules/resizing";
import type { ViewModelParams } from "@/board-editor/view-model/types";
import { NodesFactory } from "@/entities/nodes";
import { switchToArrowBinding } from "../../arrow-binding/switcher";
import type { ArrowBindingViewState } from "../../arrow-binding/view-state";
import { switchToResizing } from "../../resizing/switcher";

const directionsMap: Record<ResizeDirection, ArrowBindingViewState["side"]> = {
    n: "start",
    e: "start",
    ne: "start",
    se: "start",
    s: "end",
    w: "end",
    sw: "end",
    nw: "end"
};

/**
 * This function determines what view state will be next: binding (for arrows) or resizing (for other node types).
 *
 * @param param0 Params view model was created with.
 * @returns View state switching function.
 */
export function getResizeHandler({ nodesModel, setViewState }: ViewModelParams) {
    return (nodeId: Id, direction: ResizeDirection) => {
        const node = nodesModel.service.findOne(nodeId);

        if (!node) {
            throw new Error(`Node with id=${nodeId} not found`);
        }

        if (NodesFactory.is(node, "arrow")) {
            setViewState(switchToArrowBinding({ nodeId, side: directionsMap[direction] }));
        } else {
            setViewState(switchToResizing({ nodeId, direction }));
        }
    };
}
