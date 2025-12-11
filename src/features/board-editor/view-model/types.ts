import React from "react";
import { Rect } from "../domain/geometry";
import { NodesModel } from "../nodes/use-nodes";
import { IdleViewState } from "./variants/idle";
import { SelectionViewState } from "./variants/selection";
import { StickersViewState } from "./variants/stickers";
import { DraggingViewState } from "./variants/dragging";
import { ResizingViewState } from "./variants/resizing";
import { NodeImpl } from "../nodes/variants/base";
import { SelectionWindowViewState } from "./variants/selection-window";

export type ViewState =
    | IdleViewState
    | StickersViewState
    | SelectionViewState
    | SelectionWindowViewState
    | DraggingViewState
    | ResizingViewState;

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
