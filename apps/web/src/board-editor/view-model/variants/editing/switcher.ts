import type { Id } from "@repo/common";
import type { EditingViewState } from "./view-state";

type Params = {
    selectedNodeId: Id;
};

export function switchToEditing({ selectedNodeId }: Params): EditingViewState {
    return {
        type: "editing",
        selectedNodeId: selectedNodeId
    };
}
