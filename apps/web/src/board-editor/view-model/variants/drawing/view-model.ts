import type { DecoratableViewModel } from "../../decorators";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelParams } from "../../types";
import { DrawingNodesMapper } from "./lib/nodes.mapper";
import { useDrawing } from "./lib/use-drawing.hook";

export function useDrawingViewModel(params: ViewModelParams) {
    const drawing = useDrawing(params);

    const canvasMediator = useMouseEventsMediator();

    return (): DecoratableViewModel => {
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
}
