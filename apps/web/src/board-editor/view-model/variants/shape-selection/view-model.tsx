import { Geometry } from "@/shared/lib/geometry";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelParams } from "../../types";
import type { DecoratableViewModel } from "../../types/view-model.types";
import { switchToIdle } from "../idle/switcher";
import { switchToNodeCreation } from "../node-creation/switcher";
import { ShapeSelectionNodesMapper } from "./lib/nodes-mapper";
import { ShapeSelector } from "./ui/shape-selector.component";
import { ShapeSelectorOffset } from "./ui/ui.constants";
import type { ShapeSelectionViewState } from "./view-state";

export function useShapeSelectionViewModel({ nodesModel, setViewState }: ViewModelParams) {
    const canvasMediator = useMouseEventsMediator();

    return (viewState: ShapeSelectionViewState): DecoratableViewModel => {
        canvasMediator.setHandlers({
            left: {
                onClick: () => setViewState(switchToIdle())
            },
            right: {
                onClick: () => setViewState(switchToIdle())
            }
        });

        const shapeSelectorPosition = Geometry.applyOffset(viewState.clickPoint, ShapeSelectorOffset);

        return {
            nodes: ShapeSelectionNodesMapper.from(nodesModel.nodes).map(),
            canvas: canvasMediator.handlers,
            additionalElements: {
                layout: (
                    <ShapeSelector
                        style={{ left: shapeSelectorPosition.x, top: shapeSelectorPosition.y }}
                        onSelect={variant => setViewState(switchToNodeCreation({ type: "shape", variant }))}
                    />
                )
            }
        };
    };
}
