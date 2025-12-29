import { ViewModel, ViewModelParams, ViewState } from "../types";
import { withActions } from "./with-actions";
import { withHotKeys } from "./with-hot-keys";
import { withWindowShifting } from "./with-window-shifting";

export function applyDecorators(viewModel: ViewModel, viewState: ViewState, params: ViewModelParams) {
    const viewModelWithHotKeys = withHotKeys(viewState, params, viewModel);

    const viewModelWithActions = withActions(viewState, params.setViewState, viewModelWithHotKeys);

    const viewModelWithWindowShifting = withWindowShifting(params, viewModelWithActions);

    return viewModelWithWindowShifting;
}
