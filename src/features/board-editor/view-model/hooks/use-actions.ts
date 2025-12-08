import { ViewModel, ViewState } from "../types";
import { switchToIdle } from "../variants/use-idle-view-model";
import { switchToStickers } from "../variants/use-stickers-view-model";

type Props = {
    type: ViewState["type"];

    setViewState: (viewState: ViewState) => void;
};

export function useActions({ type, setViewState }: Props): ViewModel["actions"] {
    const isIdle = type === "idle";
    const isStickers = type === "stickers";

    return {
        idle: {
            isActive: isIdle,
            onClick: !isIdle ? () => setViewState(switchToIdle()) : undefined
        },
        stickers: {
            isActive: isStickers,
            onClick: !isStickers ? () => setViewState(switchToStickers()) : undefined
        }
    };
}
