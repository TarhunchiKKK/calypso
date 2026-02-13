import type React from "react";
import type { ReactNode } from "react";
import type { Renderable } from "../../core";
import type { LayoutDimensionsModel } from "../../modules/layout-dimensions";
import type { NodesModel } from "../../nodes";
import type { ViewState } from "./view-state.type";

export type ViewModelParams = {
    nodesModel: NodesModel;

    layoutDimensionsModel: LayoutDimensionsModel;

    setViewState: (viewState: ViewState) => void;
};

/**
 * The ViewModel is an object that contains all the necessary data and event handlers
 * for the UI components to render the current state and respond to user interactions.
 * It is derived from the current `ViewState` and is recalculated whenever the state changes.
 *
 * @property {NodeWrapper[]} nodes - The array of nodes to be rendered on the canvas.
 * @property {Rect} [selectionWindow] - The rectangle representing the selection window, if active.
 * @property {object} [layout] - Event handlers for the main layout component, such as keyboard events.
 * @property {object} [canvas] - Event handlers for the canvas, such as clicks and keyboard events.
 * @property {object} [overlay] - Event handlers for the overlay, used for mouse-based interactions like dragging and selection.
 * @property {object} actions - A collection of functions that can be called to transition the `ViewState`.
 * @property {Function} [onNodeChange] - A callback for when a node's properties are changed.
 */
export type ViewModel = {
    nodes: Renderable[];

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
        onWheel?: (e: WheelEvent) => void;
    };

    additionalElement?: ReactNode;

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
