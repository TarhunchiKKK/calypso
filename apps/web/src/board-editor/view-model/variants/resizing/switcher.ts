import type { Id } from "@repo/common";
import type { ResizeDirection } from "../../../modules/resizing";
import type { ViewModelParams } from "../../types";
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

export function useSwitchToResizing({ setViewState }: ViewModelParams) {
    const onMouseDown = (nodeId: Id, direction: ResizeDirection) => {
        setViewState(switchToResizing({ nodeId, direction }));
    };

    return {
        onMouseDown
    };
}
