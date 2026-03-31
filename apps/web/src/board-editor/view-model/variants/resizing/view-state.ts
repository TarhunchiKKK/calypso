import type { Id } from "@repo/common";
import type { ResizeDirection } from "@/board-editor/modules/resizing";

export type ResizingViewState = {
    type: "resizing";

    nodeId: Id;

    direction: ResizeDirection;
};
