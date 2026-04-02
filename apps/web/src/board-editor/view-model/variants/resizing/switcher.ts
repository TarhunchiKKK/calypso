import type { Id } from "@repo/common";
import type { ResizeDirection } from "../../../modules/resizing";
import type { ResizingViewState } from "./view-state";

type Params = {
    nodeId: Id;

    direction: ResizeDirection;
};

export function switchToResizing({ nodeId, direction }: Params): ResizingViewState {
    return {
        type: "resizing",
        nodeId: nodeId,
        direction: direction
    };
}
