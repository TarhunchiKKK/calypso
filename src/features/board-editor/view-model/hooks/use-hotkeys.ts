import { ViewModelParams, ViewState } from "../types";
import { switchToIdle } from "../variants/use-idle-view-model";
import { switchToSelection } from "../variants/use-selection-view-model";
import { switchToStickers } from "../variants/use-stickers-view-model";

export function useHotKeys(type: ViewState["type"], { nodesModel, setViewState }: ViewModelParams) {
    const handleHotkeys = (e: React.KeyboardEvent) => {
        if (e.key === "Escape" && type !== "idle") {
            setViewState(switchToIdle());
        }

        if (e.key === "i" && type !== "idle") {
            setViewState(switchToIdle());
        }

        if (e.key === "s" && type !== "stickers") {
            setViewState(switchToStickers());
        }

        if (e.key === "a" && e.ctrlKey) {
            e.preventDefault();
            setViewState(switchToSelection(new Set(nodesModel.nodes.map(node => node.id))));
        }
    };

    return { handleHotkeys };
}
