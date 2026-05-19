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
                    active: stateFlags.idle,
                    onClick: !stateFlags.idle ? () => setViewState(switchToIdle()) : undefined
                },
                stickers: {
                    active: stateFlags.stickers,
                    onClick: !stateFlags.stickers ? () => setViewState(switchToNodeCreation({ type: "sticker" })) : undefined
                },
                arrows: {
                    active: stateFlags.arrows,
                    onClick: !stateFlags.arrows ? () => setViewState(switchToNodeCreation({ type: "arrow" })) : undefined
                },
                text: {
                    active: stateFlags.text,
                    onClick: !stateFlags.text ? () => setViewState(switchToNodeCreation({ type: "text" })) : undefined
                },
                shapes: {
                    active: stateFlags.shapes,
                    onClick: (e) => (!stateFlags.shapes ? setViewState(switchToShapeSelection(Geometry.pointFromEvent(e))) : undefined)
                },
                media: {
                    active: stateFlags.media,
                    onClick: !stateFlags.media ? (e) => setViewState(switchToMediaSelection(Geometry.pointFromEvent(e))) : undefined
                },
                notes: {
                    active: stateFlags.notes,
                    onClick: !stateFlags.notes ? () => setViewState(switchToNodeCreation({ type: "note" })) : undefined
                },
                draw: {
                    active: stateFlags.draw,
                    onClick: !stateFlags.draw ? () => setViewState(switchToDrawing()) : undefined
                }
            },
            exchangeBuffer: {
                copy: {
                    active: false,
                    disabled: viewState.type !== "selection",
                    onClick: () => {
                        if (viewState.type === "selection") {
                            nodesModel.exchangeBuffer.copy(viewState.nodeIds);
                        }
                    }
                },
                paste: {
                    active: false,
                    disabled: nodesModel.exchangeBuffer.empty,
                    onClick: () => {
                        if (layoutDimensionsModel.lastClick.point) {
                            nodesModel.exchangeBuffer.paste(layoutDimensionsModel.lastClick.point);
                        }
                    }
                },
                cut: {
                    active: false,
                    disabled: viewState.type !== "selection",
                    onClick: () => {
                        if (viewState.type === "selection") {
                            console.log("Actions: ", viewState.nodeIds);
                            nodesModel.exchangeBuffer.cut(viewState.nodeIds);
                        }
                    }
                }
            },
            cancellation: {
                undo: {
                    active: false,
                    disabled: nodesModel.cancellation.sizes.undo === 0,
                    onClick: nodesModel.cancellation.undo
                },
                redo: {
                    active: false,
                    disabled: nodesModel.cancellation.sizes.redo === 0,
                    onClick: nodesModel.cancellation.redo
                }
            }
        } satisfies ViewModel["actions"]
    };
};
