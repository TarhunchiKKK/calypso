import type { Boards } from "@repo/common";
import type { Decoratable } from "@/board-editor/core";
import { withRelativePositions } from "@/board-editor/modules/arrows-resolution";
import type { ViewModel, ViewModelParams, ViewState } from "../types";
import { withActions } from "./with-actions.decorator";
import { withHotKeys } from "./with-hot-keys.decorator";
import { withLayoutDimensions } from "./with-layout-dimensions.decorator";

export function applyDecorators(viewModel: ViewModel, viewState: ViewState, params: ViewModelParams) {
    const viewModelWithHotKeys = withHotKeys(viewState, params, viewModel);

    const viewModelWithActions = withActions(viewState, params.setViewState, viewModelWithHotKeys);

    const viewModelWithLayoutDimensions = withLayoutDimensions(params, viewModelWithActions);

    const viewModelWithRelativePositions: ViewModel = {
        ...viewModelWithLayoutDimensions,
        nodes: withRelativePositions(viewModelWithLayoutDimensions.nodes as Decoratable<Boards.NodeBase>[])
    };

    return viewModelWithRelativePositions;
}
