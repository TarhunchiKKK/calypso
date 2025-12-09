import { ViewModelParams } from "../types";
import { switchToIdle } from "../variants/idle";
import { switchToSelection } from "../variants/selection";
import { switchToStickers } from "../variants/stickers";

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
            setViewState(switchToSelection({ selectedIds: new Set(nodesModel.nodes.map(node => node.id)) }));
        }
    };

    return { handleHotKeys };
}
