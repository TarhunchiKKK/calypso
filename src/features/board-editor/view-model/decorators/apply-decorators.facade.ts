import { ViewModel, ViewModelParams, ViewState } from "../types";
import { withActions } from "./with-actions.decorator";
import { withHotKeys } from "./with-hot-keys.decorator";
import { withLayoutDimensions } from "./with-layout-dimensions.decorator";

export function applyDecorators(viewModel: ViewModel, viewState: ViewState, params: ViewModelParams) {
    const viewModelWithHotKeys = withHotKeys(viewState, params, viewModel);

    const viewModelWithActions = withActions(viewState, params.setViewState, viewModelWithHotKeys);

    const viewModelWithLayoutDimensions = withLayoutDimensions(params, viewModelWithActions);

    return viewModelWithLayoutDimensions;
}
