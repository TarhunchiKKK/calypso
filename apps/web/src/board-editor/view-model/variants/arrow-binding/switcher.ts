import type { Id } from "@repo/common";
import type { ResizeDirection } from "@/board-editor/modules/resizing";
import type { ArrowBindingViewState } from "./view-state";

type Params = {
    nodeId: Id;

    direction: ResizeDirection;
};

const startSideDirections: ResizeDirection[] = ["w", "nw", "sw"];
const endSideDirections: ResizeDirection[] = ["e", "ne", "se"];

export function switchToArrowBinding({ nodeId, direction }: Params): ArrowBindingViewState {
    const isStartSide = startSideDirections.includes(direction);
    const isEndSide = endSideDirections.includes(direction);

    if (!isStartSide || !isEndSide) {
        throw Error(`switchToArrowBinding: Invalid direction: ${direction}`);
    }

    return {
        type: "arrow-binding",
        nodeId: nodeId,
        side: isStartSide ? "start" : "end"
    };
}
