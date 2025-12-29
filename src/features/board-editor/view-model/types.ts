import React from "react";
import { Rect } from "../lib/geometry";
import { NodesModel } from "../nodes/use-nodes";
import { NodeImpl } from "../nodes/variants/base";
import { IdleViewState } from "./variants/idle/view-state";
import { DraggingViewState } from "./variants/dragging/view-state";
import { ResizingViewState } from "./variants/resizing/view-state";
import { SelectionWindowViewState } from "./variants/selection-window/view-state";
import { SelectionViewState } from "./variants/selection/view-state";
import { StickersViewState } from "./variants/stickers/view-state";
import { EditingViewState } from "./variants/editing/view-state";
import { WindowShiftModel } from "../modules/layout-shifting";

/**
 * Represents the state of the view model, acting as a state machine for the board editor's UI.
 * The application behaves differently based on the current `ViewState`.
 * It can be one of the following:
 * - `Idle`: The default state, where no specific interaction is in progress.
 * - `Stickers`: The user is interacting with the sticker panel.
 * - `Selection`: One or more nodes are selected.
 * - `SelectionWindow`: The user is drawing a selection window.
 * - `Dragging`: The user is dragging one or more nodes.
 * - `Resizing`: The user is resizing a node.
 * - `Editing`: The user is editing the content of a node.
 */
export type ViewState =
    | IdleViewState
    | StickersViewState
    | SelectionViewState
    | SelectionWindowViewState
    | DraggingViewState
    | ResizingViewState
    | EditingViewState;

export type ViewModelParams = {
    nodesModel: NodesModel;

    canvasRect?: Rect;

    setViewState: (viewState: ViewState) => void;

    windowShiftModel: WindowShiftModel;
};

/**
 * The ViewModel is an object that contains all the necessary data and event handlers
 * for the UI components to render the current state and respond to user interactions.
 * It is derived from the current `ViewState` and is recalculated whenever the state changes.
 *
 * @property {NodeImpl[]} nodes - The array of nodes to be rendered on the canvas.
 * @property {Rect} [selectionWindow] - The rectangle representing the selection window, if active.
 * @property {object} [layout] - Event handlers for the main layout component, such as keyboard events.
 * @property {object} [canvas] - Event handlers for the canvas, such as clicks and keyboard events.
 * @property {object} [overlay] - Event handlers for the overlay, used for mouse-based interactions like dragging and selection.
 * @property {object} actions - A collection of functions that can be called to transition the `ViewState`.
 * @property {Function} [onNodeChange] - A callback for when a node's properties are changed.
 */
export type ViewModel = {
    nodes: NodeImpl[];

    selectionWindow?: Rect;

    layout?: {
        onKeyDown?: React.KeyboardEventHandler;
    };

    canvas?: {
        onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
        onKeyDown?: React.KeyboardEventHandler;
    };

    overlay?: {
        onKeyDown?: React.KeyboardEventHandler;
        onMouseDown?: React.MouseEventHandler;
        onMouseUp?: React.MouseEventHandler;
        onClick?: React.MouseEventHandler;
    };

    window?: {
        onMouseMove?: (e: MouseEvent) => void;
        onMouseUp?: (e: MouseEvent) => void;
    };

    actions?: {
        idle?: {
            isActive: boolean;
            onClick?: React.MouseEventHandler;
        };

        stickers?: {
            isActive: boolean;
            onClick?: React.MouseEventHandler;
        };
    };
};
