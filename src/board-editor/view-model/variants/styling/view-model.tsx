import { StylesBar } from "@/board-editor/modules/styling";
import type { OmitFields } from "@/shared/lib/typescript";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModel, ViewModelParams } from "../../types";
import { switchToSelection } from "../selection/switcher";
import { StylingNodesMapper } from "./nodes-mapping.lib";
import type { StylingViewState } from "./view-state";

export function useStylingViewModel(params: ViewModelParams) {
    const { nodesModel } = params;

    const canvasMediator = useMouseEventsMediator();

    return (viewState: StylingViewState): OmitFields<ViewModel, "actions"> => {
        canvasMediator.setHandlers({
            left: {
                onClick: () => switchToSelection({ selectedIds: viewState.selectedIds })
            }
        });

        return {
            nodes: StylingNodesMapper.from(nodesModel.nodes).applySelection(viewState.selectedIds).get(),
            canvas: canvasMediator.handlers,
            additionalElement: (
                <div style={{ left: viewState.barPosition.x, top: viewState.barPosition.y }} className="absolute -translate-x-1/2 -translate-y-1/2">
                    <StylesBar onUpdate={nodesModel.service.updateManyWithFn.bind(null, viewState.selectedIds)} />
                </div>
            )
        };
    };
}
