import { DefaultNodesMapper } from "@/board-editor/lib/default-nodes-mapper.class";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelParams } from "../../types";
import type { DecoratableViewModel } from "../../types/view-model.types";
import { switchToIdle } from "../idle/switcher";
import type { MediaSelectionViewState } from "./view-state";

export function useMediaSelectionViewModel({ nodesModel, setViewState }: ViewModelParams) {
    const canvasMediator = useMouseEventsMediator();

    return (viewState: MediaSelectionViewState): DecoratableViewModel => {
        canvasMediator.setHandlers({
            left: {
                onClick: () => setViewState(switchToIdle())
            },
            right: {
                onClick: () => setViewState(switchToIdle())
            }
        });

        return {
            nodes: DefaultNodesMapper.from(nodesModel.nodes).map(),
            canvas: canvasMediator.handlers,
            additionalElements: {
                layout: <div />
            }
        };
    };
}
