import { Geometry } from "@/shared/lib/geometry";
import type { ViewModel, ViewModelParams, ViewState } from "../types";
import type { DecoratableViewModel } from "../types/view-model.types";
import { switchToIdle } from "../variants/idle/switcher";
import { switchToNodeCreation } from "../variants/node-creation/switcher";
import { switchToShapeSelection } from "../variants/shape-selection/switcher";

const idleViewStates: ViewState["type"][] = ["idle", "selection", "selection-window", "dragging"];

function determineState(viewState: ViewState) {
    return {
        isIdle: idleViewStates.includes(viewState.type),
        isStickers: viewState.type === "node-creation" && viewState.payload.type === "sticker",
        isArrows: (viewState.type === "node-creation" && viewState.payload.type === "arrow") || viewState.type === "arrow-binding",
        isText: viewState.type === "node-creation" && viewState.payload.type === "text",
        isShapes: (viewState.type === "node-creation" && viewState.payload.type === "shape") || viewState.type === "shape-selection",
        isMedia: false,
        isNotes: false,
        isDraw: false
    };
}

export function useActionsDecorator(viewState: ViewState, setViewState: ViewModelParams["setViewState"], viewModel: DecoratableViewModel) {
    const state = determineState(viewState);

    const actions: ViewModel["actions"] = {
        idle: {
            isActive: state.isIdle,
            onClick: !state.isIdle ? () => setViewState(switchToIdle()) : undefined
        },
        stickers: {
            isActive: state.isStickers,
            onClick: !state.isStickers ? () => setViewState(switchToNodeCreation({ type: "sticker" })) : undefined
        },
        arrows: {
            isActive: state.isArrows,
            onClick: !state.isStickers ? () => setViewState(switchToNodeCreation({ type: "arrow" })) : undefined
        },
        text: {
            isActive: state.isText,
            onClick: !state.isStickers ? () => setViewState(switchToNodeCreation({ type: "text" })) : undefined
        },
        shapes: {
            isActive: state.isShapes,
            onClick: e => (!state.isShapes ? setViewState(switchToShapeSelection(Geometry.pointFromEvent(e))) : undefined)
        },
        media: {
            isActive: state.isMedia,
            onClick: () => {}
        },
        notes: {
            isActive: state.isMedia,
            onClick: () => {}
        },
        draw: {
            isActive: state.isMedia,
            onClick: () => {}
        }
    };

    return {
        ...viewModel,
        actions
    };
}
