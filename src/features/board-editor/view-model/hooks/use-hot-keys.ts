import { ViewModelParams } from "../types";
import { switchToIdle } from "../variants/use-idle-view-model";
import { switchToSelection } from "../variants/use-selection-view-model";
import { switchToStickers } from "../variants/use-stickers-view-model";

export function useHotKeys({ viewState, setViewState, nodesModel }: ViewModelParams) {
    const handleHotKeys = (e: React.KeyboardEvent) => {
        if (e.key === "Escape" && viewState.type !== "idle") {
            setViewState(switchToIdle());
        }

        if (e.key === "i" && viewState.type !== "idle") {
            setViewState(switchToIdle());
        }

        if (e.key === "s" && viewState.type !== "stickers") {
            setViewState(switchToStickers());
        }

        if (e.key === "a" && e.ctrlKey) {
            e.preventDefault();
            setViewState(switchToSelection(new Set(nodesModel.nodes.map(node => node.id))));
        }
    };

    return { handleHotKeys };
}
