import React from "react";
import { Rect } from "../domain/geometry";
import { NodeImpl } from "../nodes/types";
import { NodesModel } from "../nodes/use-nodes";
import { IdleViewState } from "./variants/use-idle-view-model";
import { SelectionViewState } from "./variants/use-selection-view-model";
import { StickersViewState } from "./variants/use-stickers-view-model";

export type ViewModelParams = {
    nodesModel: NodesModel;

    canvasRect?: Rect;

    setViewState: (viewState: ViewState) => void;
};

export type ViewState = IdleViewState | StickersViewState | SelectionViewState;

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
