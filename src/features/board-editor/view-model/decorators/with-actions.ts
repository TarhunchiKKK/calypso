import { ViewModel, ViewModelParams } from "../types";
import { switchToIdle } from "../variants/idle";
import { switchToStickers } from "../variants/stickers";

export function withActions(
    { viewState, setViewState }: ViewModelParams,
    viewModel: Omit<ViewModel, "actions">
): ViewModel {
    const isIdle = viewState.type === "idle";
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
