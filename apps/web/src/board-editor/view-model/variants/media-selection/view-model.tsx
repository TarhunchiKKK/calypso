import { DefaultNodesMapper } from "@/board-editor/core";
import { Geometry } from "@/shared/lib/geometry";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelHook } from "../../types";
import { switchToIdle } from "../idle/switcher";
import { switchToNodeCreation } from "../node-creation/switcher";
import { MediaSelector } from "./ui/media-selector";
import { MediaSelectorOffset } from "./ui/ui.constants";
import type { MediaSelectionViewState } from "./view-state";

export const useMediaSelectionViewModel: ViewModelHook<MediaSelectionViewState> = ({ nodesModel, setViewState }) => {
    const canvasMediator = useMouseEventsMediator();

    return viewState => {
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
            nodes: DefaultNodesMapper.create().setNodes(nodesModel.nodes).map(),
            canvas: canvasMediator.handlers,
            additionalElements: {
                layout: (
                    <MediaSelector
                        style={{ left: selectorPosition.x, top: selectorPosition.y }}
                        onSelect={url => setViewState(switchToNodeCreation({ type: "media", url: url }))}
                    />
                )
            }
        };
    };
};
