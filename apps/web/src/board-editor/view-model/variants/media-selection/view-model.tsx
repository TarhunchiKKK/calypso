import { DefaultNodesMapper } from "@/board-editor/core";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelHook } from "../../types";
import { switchToIdle } from "../idle/switcher";
import { switchToNodeCreation } from "../node-creation/switcher";
import { MediaSelector } from "./ui/media-selector";
import type { MediaSelectionViewState } from "./view-state";

export const useMediaSelectionViewModel: ViewModelHook<MediaSelectionViewState> = ({ nodesModel, setViewState }) => {
    const canvasMediator = useMouseEventsMediator();

    return () => {
        canvasMediator.setHandlers({
            left: {
                onClick: () => setViewState(switchToIdle())
            },
            right: {
                onClick: () => setViewState(switchToIdle())
            }
        });

        return {
            nodes: DefaultNodesMapper.create().setNodes(nodesModel.nodes).map(),
            canvas: canvasMediator.handlers,
            additionalElements: {
                actionsBar: <MediaSelector onSelect={(url) => setViewState(switchToNodeCreation({ type: "media", url: url }))} />
            }
        };
    };
};
