import { HotKeyUtils } from "@/shared/lib/hot-keys";
import { BoardHotKeys } from "../../lib/hot-keys.lib";
import type { ViewModelParams, ViewState } from "../types";
import type { DecoratableViewModel } from "../types/view-model.types";
import { switchToIdle } from "../variants/idle/switcher";
import { switchToNodeCreation } from "../variants/node-creation/switcher";
import type { NodeCreationViewState } from "../variants/node-creation/view-state";
import { switchToSelection } from "../variants/selection/switcher";

function isValidCreation(viewState: ViewState, payloadType: NodeCreationViewState["payload"]["type"]) {
    return viewState.type === "node-creation" && viewState.payload.type !== payloadType;
}

// TODO: add missing hot keys
export function useHotKeysDecorator(
    viewState: ViewState,
    { nodesModel, setViewState, layoutDimensionsModel }: ViewModelParams,
    viewModel: DecoratableViewModel
): DecoratableViewModel {
    const handleNodeCreationHotKeys = (e: React.KeyboardEvent) => {
        if (isValidCreation(viewState, "sticker") && HotKeyUtils.is(BoardHotKeys.switch.toCreation.sticker, e)) {
            setViewState(switchToNodeCreation({ type: "sticker" }));
        }

        if (isValidCreation(viewState, "arrow") && HotKeyUtils.is(BoardHotKeys.switch.toCreation.arrow, e)) {
            setViewState(switchToNodeCreation({ type: "arrow" }));
        }

        if (isValidCreation(viewState, "text") && HotKeyUtils.is(BoardHotKeys.switch.toCreation.text, e)) {
            setViewState(switchToNodeCreation({ type: "text" }));
        }

        if (isValidCreation(viewState, "shape")) {
            if (HotKeyUtils.is(BoardHotKeys.switch.toCreation.shape.rectangle, e)) {
                setViewState(switchToNodeCreation({ type: "shape", variant: "rectangle" }));
            } else if (HotKeyUtils.is(BoardHotKeys.switch.toCreation.shape.circle, e)) {
                setViewState(switchToNodeCreation({ type: "shape", variant: "circle" }));
            } else if (HotKeyUtils.is(BoardHotKeys.switch.toCreation.shape.hexagon, e)) {
                setViewState(switchToNodeCreation({ type: "shape", variant: "hexagon" }));
            }
        }
    };
    const handleSwitchViewModelHotKeys = (e: React.KeyboardEvent) => {
        if (viewState.type === "editing") {
            return;
        }

        if (viewState.type !== "idle" && HotKeyUtils.is(BoardHotKeys.switch.toIdle, e)) {
            setViewState(switchToIdle());
        }
    };

    const handleSelectionHotKeys = (e: React.KeyboardEvent) => {
        if (viewState.type !== "selection") {
            return;
        }

        if (HotKeyUtils.is(BoardHotKeys.selection.remove, e)) {
            nodesModel.service.removeMany(viewState.selectedIds);
            setViewState(switchToIdle());
        }
    };

    const handleGlobalHotKeys = (e: React.KeyboardEvent) => {
        if (viewState.type === "editing") {
            return;
        }

        if (HotKeyUtils.is(BoardHotKeys.selection.all, e)) {
            e.preventDefault();
            setViewState(switchToSelection({ selectedIds: new Set(nodesModel.nodes.map(node => node.id)) }));
        }
    };

    const handleExchangeBufferHotKeys = (e: React.KeyboardEvent) => {
        if (viewState.type === "selection" && HotKeyUtils.is(BoardHotKeys.exchangeBuffer.copy, e)) {
            e.preventDefault();
            e.stopPropagation();
            nodesModel.exchangeBuffer.copy(viewState.selectedIds);
            return;
        }

        if (["selection", "idle"].includes(viewState.type) && HotKeyUtils.is(BoardHotKeys.exchangeBuffer.paste, e)) {
            e.preventDefault();
            e.stopPropagation();

            if (!layoutDimensionsModel.lastClick.point) {
                return;
            }

            nodesModel.exchangeBuffer.paste(layoutDimensionsModel.lastClick.point);

            return;
        }

        if (viewState.type === "selection" && HotKeyUtils.is(BoardHotKeys.exchangeBuffer.cut, e)) {
            e.preventDefault();
            e.stopPropagation();
            nodesModel.exchangeBuffer.cut(viewState.selectedIds);
            return;
        }
    };

    const handleHotKeys = (e: React.KeyboardEvent) => {
        handleSwitchViewModelHotKeys(e);
        handleNodeCreationHotKeys(e);
        handleSelectionHotKeys(e);
        handleGlobalHotKeys(e);
        handleExchangeBufferHotKeys(e);
    };

    return {
        ...viewModel,
        layout: {
            ...(viewModel.layout ?? {}),
            onKeyDown: handleHotKeys
        }
    };
}
