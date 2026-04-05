import { HotKeyUtils } from "@/shared/lib/hot-keys";
import { HotKeysMap } from "../../lib/hot-keys-map.constants";
import type { ViewModelParams, ViewState } from "../types";
import type { DecoratableViewModel } from "../types/view-model.types";
import { switchToIdle } from "../variants/idle/switcher";
import { switchToSelection } from "../variants/selection/switcher";
import { switchToStickersCreation } from "../variants/stickers-creation/switcher";

export function withHotKeys(viewState: ViewState, { nodesModel, setViewState }: ViewModelParams, viewModel: DecoratableViewModel): DecoratableViewModel {
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
