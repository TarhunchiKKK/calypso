import { useMouseEventsMediator } from "../hooks/use-mouse-events-mediator.hook";
import type { ViewModelDecorator } from "./types";

export const useLastClickDecorator: ViewModelDecorator = (viewModel, _, { layoutDimensionsModel }) => {
    const canvasMediator = useMouseEventsMediator();

    canvasMediator.setHandlers({
        left: {
            onClick: layoutDimensionsModel.lastClick.handle
        }
    });

    return {
        ...viewModel,
        canvas: {
            ...viewModel.canvas,
            onMouseDown: e => {
                viewModel.canvas?.onMouseDown?.(e);
                canvasMediator.handlers.onMouseDown(e);
            },
            onMouseUp: e => {
                viewModel.canvas?.onMouseUp(e);
                canvasMediator.handlers.onMouseUp(e);
            }
        }
    };
};
