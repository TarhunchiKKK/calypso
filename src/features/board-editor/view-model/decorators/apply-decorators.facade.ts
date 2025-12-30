import { ViewModel, ViewModelParams, ViewState } from "../types";
import { withActions } from "./with-actions.decorator";
import { withHotKeys } from "./with-hot-keys.decorator";
import { withLayoutShifting } from "./with-layout-shifting.decorator";

export function applyDecorators(viewModel: ViewModel, viewState: ViewState, params: ViewModelParams) {
    const viewModelWithHotKeys = withHotKeys(viewState, params, viewModel);

    const viewModelWithActions = withActions(viewState, params.setViewState, viewModelWithHotKeys);

    const viewModelWithLayoutShift = withLayoutShifting(params, viewModelWithActions);

    return viewModelWithLayoutShift;
}
