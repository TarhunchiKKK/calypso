import { EditingViewState } from "./view-state";

type Params = {
    selectedNodeId: string;
};

export function switchToEditing({ selectedNodeId }: Params): EditingViewState {
    return {
        type: "editing",
        selectedNodeId: selectedNodeId
    };
}
