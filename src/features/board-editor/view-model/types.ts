import React from "react";
import { Rect } from "../domain/geometry";
import { NodesModel } from "../nodes/use-nodes";
import { NodeImpl } from "../nodes/variants/base";
import { IdleViewState } from "./variants/idle/view-state";
import { DraggingViewState } from "./variants/dragging/view-state";
import { ResizingViewState } from "./variants/resizing/view-state";
import { SelectionWindowViewState } from "./variants/selection-window/view-state";
import { SelectionViewState } from "./variants/selection/view-state";
import { StickersViewState } from "./variants/stickers/view-state";
import { EditingViewState } from "./variants/editing/view-state";

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
};

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
