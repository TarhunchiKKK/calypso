import { BoardHotKeys } from "@/board-editor/lib/hot-keys.lib";
import { HotKeyUtils } from "@/shared/lib/hot-keys";
import type { ViewModel, ViewState } from "../types";
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
                    onClick: !stateFlags.idle ? () => setViewState(switchToIdle()) : undefined,
                    title: "Idle",
                    shortcut: HotKeyUtils.stringify(BoardHotKeys.switch.toIdle[0])
                },
                stickers: {
                    active: stateFlags.stickers,
                    onClick: !stateFlags.stickers ? () => setViewState(switchToNodeCreation({ type: "sticker" })) : undefined,
                    title: "Sticker",
                    shortcut: HotKeyUtils.stringify(BoardHotKeys.switch.toCreation.sticker)
                },
                text: {
                    active: stateFlags.text,
                    onClick: !stateFlags.text ? () => setViewState(switchToNodeCreation({ type: "text" })) : undefined,
                    title: "Text",
                    shortcut: HotKeyUtils.stringify(BoardHotKeys.switch.toCreation.text)
                },
                shapes: {
                    active: stateFlags.shapes,
                    onClick: () => (!stateFlags.shapes ? setViewState(switchToShapeSelection()) : undefined),
                    title: "Shapes"
                },
                media: {
                    active: stateFlags.media,
                    onClick: !stateFlags.media ? () => setViewState(switchToMediaSelection()) : undefined,
                    title: "Media"
                },
                notes: {
                    active: stateFlags.notes,
                    onClick: !stateFlags.notes ? () => setViewState(switchToNodeCreation({ type: "note" })) : undefined,
                    title: "Notes"
                },
                draw: {
                    active: stateFlags.draw,
                    onClick: !stateFlags.draw ? () => setViewState(switchToDrawing()) : undefined,
                    title: "Pen"
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
                    },
                    title: "Copy",
                    shortcut: HotKeyUtils.stringify(BoardHotKeys.exchangeBuffer.copy)
                },
                paste: {
                    active: false,
                    disabled: nodesModel.exchangeBuffer.empty,
                    onClick: () => {
                        if (layoutDimensionsModel.lastClick.point) {
                            nodesModel.exchangeBuffer.paste(layoutDimensionsModel.lastClick.point);
                        }
                    },

                    title: "Paste",
                    shortcut: HotKeyUtils.stringify(BoardHotKeys.exchangeBuffer.paste)
                },
                cut: {
                    active: false,
                    disabled: viewState.type !== "selection",
                    onClick: () => {
                        if (viewState.type === "selection") {
                            console.log("Actions: ", viewState.nodeIds);
                            nodesModel.exchangeBuffer.cut(viewState.nodeIds);
                        }
                    },
                    title: "Cut",
                    shortcut: HotKeyUtils.stringify(BoardHotKeys.exchangeBuffer.cut)
                }
            },
            cancellation: {
                undo: {
                    active: false,
                    disabled: nodesModel.cancellation.sizes.undo === 0,
                    onClick: nodesModel.cancellation.undo,
                    title: "Undo",
                    shortcut: HotKeyUtils.stringify(BoardHotKeys.cancellation.undo)
                },
                redo: {
                    active: false,
                    disabled: nodesModel.cancellation.sizes.redo === 0,
                    onClick: nodesModel.cancellation.redo,
                    title: "Redo",
                    shortcut: HotKeyUtils.stringify(BoardHotKeys.cancellation.redo)
                }
            }
        }
    };
};
