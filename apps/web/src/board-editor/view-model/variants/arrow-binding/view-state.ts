import type { Id } from "@lib/common";

export type ArrowBindingViewState = {
    type: "arrow-binding";

    nodeId: Id;

    side: "start" | "end";
};
