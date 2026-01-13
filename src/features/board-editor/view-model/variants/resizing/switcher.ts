import type { ResizeDirection } from "@/features/board-editor/modules/resizing";
import type { ResizingViewState } from "./view-state";

type Params = {
    nodeId: string;

    direction: ResizeDirection;
};

export function switchToResizing({ nodeId, direction }: Params): ResizingViewState {
    return {
        type: "resizing",
        nodeId: nodeId,
        direction: direction
    };
}
