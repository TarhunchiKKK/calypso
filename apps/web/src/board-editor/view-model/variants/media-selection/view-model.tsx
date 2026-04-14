import { DefaultNodesMapper } from "@/board-editor/lib/default-nodes-mapper.class";
import { Geometry } from "@/shared/lib/geometry";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelParams } from "../../types";
import type { DecoratableViewModel } from "../../types/view-model.types";
import { switchToIdle } from "../idle/switcher";
import { MediaSelector } from "./ui/media-selector";
import { MediaSelectorOffset } from "./ui/ui.constants";
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

        const selectorPosition = Geometry.applyOffset(viewState.clickPoint, MediaSelectorOffset);

        return {
            nodes: DefaultNodesMapper.from(nodesModel.nodes).map(),
            canvas: canvasMediator.handlers,
            additionalElements: {
                layout: <MediaSelector style={{ left: selectorPosition.x, top: selectorPosition.y }} onSelect={() => {}} />
            }
        };
    };
}
