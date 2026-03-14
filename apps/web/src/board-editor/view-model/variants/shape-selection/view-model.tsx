import { Geometry } from "@/shared/lib/geometry";
import type { OmitFields } from "@/shared/lib/typescript";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModel, ViewModelParams } from "../../types";
import { switchToIdle } from "../idle/switcher";
import { switchToShapesCreation } from "../shapes-creation/switcher";
import { ShapeSelectionNodesMapper } from "./lib/nodes-mapper";
import { ShapeSelector } from "./ui/shape-selector.component";
import { ShapeSelectorOffset } from "./ui/ui.constants";
import type { ShapeSelectionViewState } from "./view-state";

export function useShapeSelectionViewModel(params: ViewModelParams) {
    const { nodesModel, setViewState } = params;

    const canvasMediator = useMouseEventsMediator();

    return (viewState: ShapeSelectionViewState): OmitFields<ViewModel, "actions"> => {
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
                    <div
                        style={{ left: shapeSelectorPosition.x, top: shapeSelectorPosition.y }}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                    >
                        <ShapeSelector onSelect={variant => setViewState(switchToShapesCreation(variant))} />
                    </div>
                )
            }
        };
    };
}
