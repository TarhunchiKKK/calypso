import type { Id } from "@repo/common";
import type { ArrowBindingViewState } from "./view-state";

type Params = {
    nodeId: Id;

    side: "start" | "end";
};

export function switchToArrowBinding({ nodeId, side }: Params): ArrowBindingViewState {
    return {
        type: "arrow-binding",
        arrowId: nodeId,
        side: side
    };
}
