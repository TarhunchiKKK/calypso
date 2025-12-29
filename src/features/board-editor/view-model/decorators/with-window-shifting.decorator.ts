import { ViewModel, ViewModelParams } from "../types";

/**
 * `withWindowShift` is a decorator function that enhances a `ViewModel` with window shifting capabilities.
 * It integrates the `windowShiftModel`'s event handlers (`handleMouseDown`, `handleMouseMove`, `handleMouseUp`)
 * into the `ViewModel`'s `overlay` and `window` event listeners.
 *
 * This allows the user to pan or shift the view by right-clicking and dragging on the overlay.
 *
 * @param {ViewModelParams} viewModelParams - An object containing the view model parameters, including `windowShiftModel`.
 * @param {ViewModel} viewModel - The base view model to be decorated.
 * @returns {ViewModel} A new `ViewModel` instance with the integrated window shifting functionality.
 */
export function withWindowShift({ windowShiftModel }: ViewModelParams, viewModel: ViewModel): ViewModel {
    return {
        ...viewModel,
        overlay: {
            ...viewModel.overlay,
            onMouseDown: e => {
                viewModel.overlay?.onMouseDown?.(e);
                windowShiftModel.handleMouseDown(e);
            }
        },
        window: {
            ...viewModel.window,
            onMouseMove: e => {
                viewModel.window?.onMouseMove?.(e);
                windowShiftModel.handleMouseMove(e);
            },
            onMouseUp: e => {
                viewModel.window?.onMouseUp?.(e);
                windowShiftModel.handleMouseUp();
            }
        }
    };
}
