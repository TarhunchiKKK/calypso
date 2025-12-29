import { ResizeDirection } from "@/features/board-editor/modules/resizing";

export type ResizingViewState = {
    type: "resizing";

    nodeId: string;

    direction: ResizeDirection;
};
