import type { Id } from "@lib/common";

export type EditingViewState = {
    type: "editing";

    nodeId: Id;
};
