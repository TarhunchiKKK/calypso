import type { Id } from "@repo/common";

export type ArrowBindingViewState = {
    type: "arrow-binding";

    nodeId: Id;

    side: "start" | "end";
};
