import { Rect } from "../domain/rect";
import { NodeImpl } from "../nodes/types";
import { NodesModel } from "../nodes/use-nodes";
import { IdleViewState } from "./use-idle-view-model";
import { StickersViewState } from "./use-stickers-view-model";

export type ViewModelParams = {
    nodesModel: NodesModel;

    canvasRect?: Rect;

    setViewState: (viewState: ViewState) => void;
};

export type ViewState = IdleViewState | StickersViewState;

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
        _?: () => void;
        onKeyDown?: React.KeyboardEventHandler;
    };

    window?: {
        _?: () => void;
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
