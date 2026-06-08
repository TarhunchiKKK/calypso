import type { Id, RelativePoint } from "@lib/common";

export type BindingNodeHandlers = {
    onMouseEnter?: (nodeId: Id) => void;

    onMouseLeave?: () => void;

    onMouseUp?: (point: RelativePoint) => void;
};
