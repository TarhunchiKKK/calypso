import { Geometry } from "@/shared/lib/geometry";
import type { ViewState } from "../types";
import type { ViewModel } from "../types/view-model.types";
import { switchToDrawing } from "../variants/drawing/switcher";
import { switchToIdle } from "../variants/idle/switcher";
import { switchToMediaSelection } from "../variants/media-selection/switcher";
import { switchToNodeCreation } from "../variants/node-creation/switcher";
import { switchToShapeSelection } from "../variants/shape-selection/switcher";
import type { ViewModelDecorator } from "./types";

const idleViewStates: ViewState["type"][] = ["idle", "selection", "selection-window", "dragging"];

function determineStateFlags(viewState: ViewState) {
    return {
        idle: idleViewStates.includes(viewState.type),
        stickers: viewState.type === "node-creation" && viewState.payload.type === "sticker",
        arrows: (viewState.type === "node-creation" && viewState.payload.type === "arrow") || viewState.type === "arrow-binding",
        text: viewState.type === "node-creation" && viewState.payload.type === "text",
        shapes: (viewState.type === "node-creation" && viewState.payload.type === "shape") || viewState.type === "shape-selection",
        media: (viewState.type === "node-creation" && viewState.payload.type === "media") || viewState.type === "media-selection",
        notes: viewState.type === "node-creation" && viewState.payload.type === "note",
        draw: viewState.type === "drawing"
    };
}

export const useActionsDecorator: ViewModelDecorator<ViewModel> = (viewModel, viewState, { setViewState, nodesModel, layoutDimensionsModel }) => {
    const stateFlags = determineStateFlags(viewState);

    return {
        ...viewModel,
        actions: {
            nodes: {
                idle: {
                    isActive: stateFlags.idle,
                    onClick: !stateFlags.idle ? () => setViewState(switchToIdle()) : undefined
                },
                stickers: {
                    isActive: stateFlags.stickers,
                    onClick: !stateFlags.stickers ? () => setViewState(switchToNodeCreation({ type: "sticker" })) : undefined
                },
                arrows: {
                    isActive: stateFlags.arrows,
                    onClick: !stateFlags.arrows ? () => setViewState(switchToNodeCreation({ type: "arrow" })) : undefined
                },
                text: {
                    isActive: stateFlags.text,
                    onClick: !stateFlags.text ? () => setViewState(switchToNodeCreation({ type: "text" })) : undefined
                },
                shapes: {
                    isActive: stateFlags.shapes,
                    onClick: e => (!stateFlags.shapes ? setViewState(switchToShapeSelection(Geometry.pointFromEvent(e))) : undefined)
                },
                media: {
                    isActive: stateFlags.media,
                    onClick: !stateFlags.media ? e => setViewState(switchToMediaSelection(Geometry.pointFromEvent(e))) : undefined
                },
                notes: {
                    isActive: stateFlags.notes,
                    onClick: !stateFlags.notes ? () => setViewState(switchToNodeCreation({ type: "note" })) : undefined
                },
                draw: {
                    isActive: stateFlags.draw,
                    onClick: !stateFlags.draw ? () => setViewState(switchToDrawing()) : undefined
                }
            },
            exchangeBuffer: {
                copy: {
                    isActive: false,
                    onClick: () => {
                        if (viewState.type === "selection") {
                            nodesModel.exchangeBuffer.copy(viewState.selectedIds);
                        }
                    }
                },
                paste: {
                    isActive: false,
                    onClick: () => {
                        if (layoutDimensionsModel.lastClick.point) {
                            nodesModel.exchangeBuffer.paste(layoutDimensionsModel.lastClick.point);
                        }
                    }
                },
                cut: {
                    isActive: false,
                    onClick: () => {
                        if (viewState.type === "selection") {
                            nodesModel.exchangeBuffer.cut(viewState.selectedIds);
                        }
                    }
                }
            },
            cancellation: {
                undo: {
                    isActive: false,
                    onClick: nodesModel.cancellation.undo
                },
                redo: {
                    isActive: false,
                    onClick: nodesModel.cancellation.redo
                }
            }
        } satisfies ViewModel["actions"]
    };
};
