import type { OmitFields } from "@/shared/lib/typescript";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModel, ViewModelParams } from "../../types";
import { switchToIdle } from "../idle/switcher";
import { ShapeSelectionNodesMapper } from "./nodes-mapping.lib";
import { ShapeSelector } from "./shape-selector.component";
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

        return {
            nodes: ShapeSelectionNodesMapper.from(nodesModel.nodes).get(),
            canvas: canvasMediator.handlers,
            additionalElements: {
                layout: (
                    <div style={{ left: viewState.clickPoint.x, top: viewState.clickPoint.y }} className="absolute -translate-x-1/2 -translate-y-1/2">
                        <ShapeSelector onSelect={() => {}} />
                    </div>
                )
            }
        };
    };
}
