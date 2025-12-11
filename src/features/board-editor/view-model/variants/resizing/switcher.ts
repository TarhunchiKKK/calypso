import { ResizeDirection } from "@/features/board-editor/domain/dom";
import { ResizingViewState } from "./view-state";

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
