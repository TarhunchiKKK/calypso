import { DefaultNodesMapper } from "@/board-editor/core";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelHook } from "../../types";
import { switchToIdle } from "../idle/switcher";
import { ShapeSelector } from "./ui/shape-selector.component";
import type { ShapeSelectionViewState } from "./view-state";

export const useShapeSelectionViewModel: ViewModelHook<ShapeSelectionViewState> = ({ nodesModel, setViewState }) => {
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
                actionsBar: <ShapeSelector setViewState={setViewState} />
            }
        };
    };
};
