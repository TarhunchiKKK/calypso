import type { Id } from "@repo/common";

export type ArrowBindingViewState = {
    type: "arrow-binding";

    arrowId: Id;

    side: "start" | "end";
};
