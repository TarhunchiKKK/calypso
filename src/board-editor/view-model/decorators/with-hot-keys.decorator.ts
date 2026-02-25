import { HotKeyUtils } from "@/shared/lib/hot-keys";
import { HotKeysMap } from "../../lib/hot-keys-map.constants";
import type { ViewModel, ViewModelParams, ViewState } from "../types";
import { switchToIdle } from "../variants/idle/switcher";
import { switchToSelection } from "../variants/selection/switcher";
import { switchToStickersCreation } from "../variants/stickers-creation/switcher";

/**
 * A decorator function that enhances a ViewModel with keyboard shortcuts (hotkeys).
 * It attaches an `onKeyDown` event handler to the main layout, allowing for global hotkey support.
 * This function centralizes all keyboard-related interactions, such as switching states, selecting nodes,
 * and deleting them.
 *
 * @param viewState - The current `ViewState` of the application.
 * @param viewModelParams - The parameters required to construct the ViewModel, including the nodes model and state setter.
 * @param viewModel - The base `ViewModel` to be decorated with hotkey functionality.
 * @returns A new `ViewModel` instance that includes the `onKeyDown` handler for hotkeys.
 */
export function withHotKeys(
    viewState: ViewState,
    { nodesModel, setViewState }: ViewModelParams,
    viewModel: ViewModel
): ViewModel {
    const handleSwitchViewModelHotKeys = (e: React.KeyboardEvent) => {
        if (viewState.type === "editing") {
            return;
        }

        if (viewState.type !== "idle" && HotKeyUtils.is(HotKeysMap.switch.toIdle, e)) {
            setViewState(switchToIdle());
        }

        if (viewState.type !== "stickers-creation" && HotKeyUtils.is(HotKeysMap.switch.toStickersCreation, e)) {
            setViewState(switchToStickersCreation());
        }
    };

    const handleSelectionHotKeys = (e: React.KeyboardEvent) => {
        if (viewState.type !== "selection") {
            return;
        }

        if (HotKeyUtils.is(HotKeysMap.selection.remove, e)) {
            nodesModel.service.removeMany(viewState.selectedIds);
            setViewState(switchToIdle());
        }
    };

    const handleGlobalHotKeys = (e: React.KeyboardEvent) => {
        if (viewState.type === "editing") {
            return;
        }

        if (HotKeyUtils.is(HotKeysMap.selection.all, e)) {
            e.preventDefault();
            setViewState(switchToSelection({ selectedIds: new Set(nodesModel.nodes.map(node => node.id)) }));
        }
    };

    const handleHotKeys = (e: React.KeyboardEvent) => {
        handleSwitchViewModelHotKeys(e);
        handleSelectionHotKeys(e);
        handleGlobalHotKeys(e);
    };

    return {
        ...viewModel,
        layout: {
            ...(viewModel.layout ?? {}),
            onKeyDown: e => {
                handleHotKeys(e);
            }
        }
    };
}
