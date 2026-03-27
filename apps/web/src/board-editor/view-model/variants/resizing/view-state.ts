import type { ResizeDirection } from "@/board-editor/modules/resizing";
import type { Id } from "@repo/common";

export type ResizingViewState = {
    type: "resizing";

    nodeId: Id;

    direction: ResizeDirection;
};
