import type { Id } from "@lib/common";
import type { LayoutDimensionsModel } from "../../modules/layout-dimensions";
import type { NodesModel } from "../../nodes";
import type { DecoratableViewModel } from "../decorators";
import type { ViewState } from "./view-state.type";

export type ViewModelParams = {
    boardId: Id;

    nodesModel: NodesModel;

    layoutDimensionsModel: LayoutDimensionsModel;

    setViewState: (viewState: ViewState) => void;
};

type ViewModelFn<State extends ViewState> = (viewState: State) => DecoratableViewModel;

export type ViewModelHook<State extends ViewState> = (params: ViewModelParams) => ViewModelFn<State>;
