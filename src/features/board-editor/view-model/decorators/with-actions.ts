import { ViewModel, ViewModelParams, ViewState } from "../types";
import { switchToIdle } from "../variants/idle";
import { switchToStickers } from "../variants/stickers";

export function withActions(
    viewState: ViewState,
    setViewState: ViewModelParams["setViewState"],
    viewModel: Omit<ViewModel, "actions">
): ViewModel {
    const isIdle = viewState.type === "idle" || viewState.type === "selection" || viewState.type === "dragging";
    const isStickers = viewState.type === "stickers";

    const actions: ViewModel["actions"] = {
        idle: {
            isActive: isIdle,
            onClick: !isIdle ? () => setViewState(switchToIdle()) : undefined
        },
        stickers: {
            isActive: isStickers,
            onClick: !isStickers ? () => setViewState(switchToStickers()) : undefined
        }
    };

    return {
        ...viewModel,
        actions
    };
}
