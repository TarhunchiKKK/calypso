import type { Id } from "@repo/common";
import type React from "react";
import type { Renderable } from "../../core";
import type { LayoutDimensionsModel } from "../../modules/layout-dimensions";
import type { NodesModel } from "../../nodes";
import type { ViewState } from "./view-state.type";

export type ViewModelParams = {
    boardId: Id;

    nodesModel: NodesModel;

    layoutDimensionsModel: LayoutDimensionsModel;

    setViewState: (viewState: ViewState) => void;
};

export type ViewModel = {
    nodes: Renderable[];

    layout?: {
        onKeyDown?: React.KeyboardEventHandler;
    };

    canvas?: {
        onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
        onMouseUp: (e: React.MouseEvent<HTMLDivElement>) => void;
        onKeyDown?: React.KeyboardEventHandler;
    };

    overlay?: {
        onKeyDown?: React.KeyboardEventHandler;
        onMouseDown?: React.MouseEventHandler;
        onMouseUp?: React.MouseEventHandler;
    };

    window?: {
        onMouseMove?: (e: MouseEvent) => void;
        onMouseUp?: (e: MouseEvent) => void;
        onWheel?: (e: WheelEvent) => void;
    };

    additionalElements?: {
        canvas?: React.ReactNode;
        layout?: React.ReactNode;
    };

    actions: {
        idle?: {
            isActive: boolean;
            onClick?: React.MouseEventHandler;
        };

        arrows?: {
            isActive: boolean;
            onClick: React.MouseEventHandler;
        };

        stickers?: {
            isActive: boolean;
            onClick?: React.MouseEventHandler;
        };

        shapes?: {
            isActive: boolean;
            onClick?: React.MouseEventHandler;
        };
    };
};
