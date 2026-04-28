import type { Id, RelativePoint } from "@repo/common";

export type BindingNodeHandlers = {
    onMouseEnter?: (nodeId: Id) => void;

    onMouseLeave?: () => void;

    onMouseUp?: (point: RelativePoint) => void;
};
