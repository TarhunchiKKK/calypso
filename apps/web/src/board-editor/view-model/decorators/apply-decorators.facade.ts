import type { ViewModelParams, ViewState } from "../types";
import type { DecoratableViewModel, ViewModel } from "../types/view-model.types";
import { withActions } from "./with-actions.decorator";
import { withHotKeys } from "./with-hot-keys.decorator";
import { withLayoutDimensions } from "./with-layout-dimensions.decorator";

export function applyDecorators(viewModel: DecoratableViewModel, viewState: ViewState, params: ViewModelParams): ViewModel {
    const viewModelWithHotKeys = withHotKeys(viewState, params, viewModel);

    const viewModelWithLayoutDimensions = withLayoutDimensions(params, viewModelWithHotKeys);

    const viewModelWithActions = withActions(viewState, params.setViewState, viewModelWithLayoutDimensions);

    return viewModelWithActions;
}
