import { ViewState } from "../types";
import { switchToIdle } from "../use-idle-view-model";
import { switchToStickers } from "../use-stickers-view-model";

type Props = {
    type: ViewState["type"];

    setViewState: (viewState: ViewState) => void;
};

export function useHotKeys({ type, setViewState }: Props) {
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
    };

    return { handleHotkeys };
}
