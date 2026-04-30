import type { ViewModel } from "../types/view-model.types";
import { useActionsDecorator } from "./actions.decorator";
import { useHotKeysDecorator } from "./hot-keys.decorator";
import { useLastClickDecorator } from "./last-click.decorator";
import { useLayoutDimensionsDecorator } from "./layout-dimensions.decorator";
import type { ViewModelDecorator } from "./types";

export type { DecoratableViewModel } from "./types";

export const useViewModelDecorators: ViewModelDecorator<ViewModel> = (viewModel, viewState, params) => {
    const viewModelWithLastClick = useLastClickDecorator(viewModel, viewState, params);

    const viewModelWithHotKeys = useHotKeysDecorator(viewModelWithLastClick, viewState, params);

    const viewModelWithLayoutDimensions = useLayoutDimensionsDecorator(viewModelWithHotKeys, viewState, params);

    const viewModelWithActions = useActionsDecorator(viewModelWithLayoutDimensions, viewState, params);

    return viewModelWithActions;
};
