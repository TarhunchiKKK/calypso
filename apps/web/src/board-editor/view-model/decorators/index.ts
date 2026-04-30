import type { ViewModelParams, ViewState } from "../types";
import type { DecoratableViewModel, ViewModel } from "../types/view-model.types";
import { useActionsDecorator } from "./actions.decorator";
import { useHotKeysDecorator } from "./hot-keys.decorator";
import { useLastClickDecorator } from "./last-click.decorator";
import { useLayoutDimensionsDecorator } from "./layout-dimensions.decorator";

export function useViewModelDecorators(viewModel: DecoratableViewModel, viewState: ViewState, params: ViewModelParams): ViewModel {
    const viewModelWithLastClick = useLastClickDecorator(params, viewModel);

    const viewModelWithHotKeys = useHotKeysDecorator(viewState, params, viewModelWithLastClick);

    const viewModelWithLayoutDimensions = useLayoutDimensionsDecorator(params, viewModelWithHotKeys);

    const viewModelWithActions = useActionsDecorator(viewState, params, viewModelWithLayoutDimensions);

    return viewModelWithActions;
}
