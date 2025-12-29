import { ViewModel, ViewModelParams } from "../types";

export function withWindowShifting({ windowShiftingModel }: ViewModelParams, viewModel: ViewModel): ViewModel {
    return {
        ...viewModel,
        overlay: {
            ...viewModel.overlay,
            onMouseDown: e => {
                viewModel.overlay?.onMouseDown?.(e);
                windowShiftingModel.handleMouseDown(e);
            }
        },
        window: {
            ...viewModel.window,
            onMouseMove: e => {
                viewModel.window?.onMouseMove?.(e);
                windowShiftingModel.handleMouseMove(e);
            },
            onMouseUp: e => {
                viewModel.window?.onMouseUp?.(e);
                windowShiftingModel.handleMouseUp();
            }
        }
    };
}
