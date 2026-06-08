import type { Id } from "@lib/common";
import type { EditingViewState } from "./view-state";

type Params = {
    nodeId: Id;
};

export function switchToEditing({ nodeId }: Params): EditingViewState {
    return {
        type: "editing",
        nodeId: nodeId
    };
}
