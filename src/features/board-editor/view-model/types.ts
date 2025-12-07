import { Rect } from "../domain/rect";
import { NodeImpl } from "../nodes/types";
import { NodesModel } from "../nodes/use-nodes";
import { IdleViewState } from "./use-idle-view-model";
import { StickersViewState } from "./use-stickers-view-model";

export type ViewModelParams = {
    nodesModel: NodesModel;

    canvasRect?: Rect;
};

export type ViewState = IdleViewState | StickersViewState;

export type ViewModel = {
    nodes: NodeImpl[];

    selectionWindow?: Rect;

    layout?: {
        _?: () => void;
    };

    canvas?: {
        onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    };

    overlay?: {
        _?: () => void;
    };

    window?: {
        _?: () => void;
    };
};
