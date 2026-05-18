import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelHook } from "../../types";
import { DrawingNodesMapper } from "./lib/nodes.mapper";
import { useDrawing } from "./lib/use-drawing.hook";
import type { DrawingViewState } from "./view-state";

export const useDrawingViewModel: ViewModelHook<DrawingViewState> = params => {
    const drawing = useDrawing(params);

    const canvasMediator = useMouseEventsMediator();

    return () => {
        canvasMediator.setHandlers({
            left: {
                onMouseDown: drawing.onMouseDown
            }
        });

        return {
            nodes: DrawingNodesMapper.create().setNodes(params.nodesModel.nodes).setDrawingNode(drawing.node).map(),
            canvas: canvasMediator.handlers,
            window: {
                onMouseMove: drawing.onMouseMove,
                onMouseUp: drawing.onMouseUp
            }
        };
    };
};
