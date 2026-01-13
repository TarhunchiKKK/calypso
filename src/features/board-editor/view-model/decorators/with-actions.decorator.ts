import type { ViewModel, ViewModelParams, ViewState } from "../types";
import { switchToIdle } from "../variants/idle/switcher";
import { switchToStickers } from "../variants/stickers/switcher";

const idleViewStates: ViewState["type"][] = ["idle", "selection", "selection-window", "dragging"];

/**
 * A decorator function that enriches the ViewModel with a set of UI actions.
 * These actions are used to transition between different view states, such as switching to the "idle" or "stickers" mode.
 * The function determines the availability and behavior of these actions based on the current `viewState`.
 *
 * @param viewState - The current `ViewState` of the application.
 * @param setViewState - The function to call to update the application's `ViewState`.
 * @param viewModel - The base `ViewModel` (without the `actions` property) to be decorated.
 * @returns A new `ViewModel` instance that includes the `actions` property. The `actions` object
 *   maps action names to their state (active or not) and the `onClick` handler to trigger them.
 */
export function withActions(
    viewState: ViewState,
    setViewState: ViewModelParams["setViewState"],
    viewModel: Omit<ViewModel, "actions">
): ViewModel {
    const isIdle = idleViewStates.includes(viewState.type);
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
