import type { ViewModelDecorator } from "./types";

export const useLayoutDimensionsDecorator: ViewModelDecorator = (viewModel, _, { layoutDimensionsModel }) => {
    return {
        ...viewModel,
        overlay: {
            ...viewModel.overlay,
            onMouseDown: (e) => {
                viewModel.overlay?.onMouseDown?.(e);
                layoutDimensionsModel.handlers.startShifting(e);
            }
        },
        window: {
            ...viewModel.window,
            onMouseMove: (e) => {
                viewModel.window?.onMouseMove?.(e);
                layoutDimensionsModel.handlers.shift(e);
            },
            onMouseUp: (e) => {
                viewModel.window?.onMouseUp?.(e);
                layoutDimensionsModel.handlers.endShifting();
            },
            onWheel: layoutDimensionsModel.handlers.zoom
        }
    };
};
