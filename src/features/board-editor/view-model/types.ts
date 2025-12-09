import React from "react";
import { Rect } from "../domain/geometry";
import { NodeImpl } from "../nodes/types";
import { NodesModel } from "../nodes/use-nodes";
import { IdleViewState } from "./variants/idle";
import { SelectionViewState } from "./variants/selection";
import { StickersViewState } from "./variants/stickers";
import { DraggingViewState } from "./variants/dragging";

export type ViewState = IdleViewState | StickersViewState | SelectionViewState | DraggingViewState;

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
