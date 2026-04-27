import type { Id } from "@repo/common";
import type { ResizeDirection } from "@/board-editor/modules/resizing";
import { NodesFactory } from "@/board-editor/nodes";
import type { ViewModelParams } from "@/board-editor/view-model/types";
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
export function getResizeHandler({ nodesModel, setViewState }: ViewModelParams) {
    return (nodeId: Id, direction: ResizeDirection) => {
        const node = nodesModel.nodes.find(node => node.id === nodeId);

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
