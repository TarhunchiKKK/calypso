import { ResizeDirection } from "@/features/board-editor/domain/dom";

export type ResizingViewState = {
    type: "resizing";

    nodeId: string;

    direction: ResizeDirection;
};
