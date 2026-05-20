import type { Id } from "@repo/common";

export type EditingViewState = {
    type: "editing";

    nodeId: Id;
};
