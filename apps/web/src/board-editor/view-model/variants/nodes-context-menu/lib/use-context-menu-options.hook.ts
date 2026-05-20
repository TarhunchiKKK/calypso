import { BoardHotKeys } from "@/board-editor/lib/hot-keys.lib";
import type { ViewModelParams } from "@/board-editor/view-model/types";
import { switchToIdle } from "../../idle/switcher";
import type { NodesContextMenuViewState } from "../view-state";
import type { ContextMenuOptionsGroup } from "./types";

export function useContextMenuOptions({ nodesModel, setViewState }: ViewModelParams) {
    const create = (viewState: NodesContextMenuViewState): ContextMenuOptionsGroup[] => {
        return [
            {
                label: "Exchange",
                options: [
                    {
                        label: "Copy",
                        hotKey: BoardHotKeys.exchangeBuffer.copy,
                        onClick: () => {
                            nodesModel.exchangeBuffer.copy(viewState.nodeIds);
                        }
                    },
                    {
                        label: "Cut",
                        hotKey: BoardHotKeys.exchangeBuffer.cut,
                        onClick: () => {
                            nodesModel.exchangeBuffer.cut(viewState.nodeIds);
                            setViewState(switchToIdle());
                        }
                    }
                ]
            },
            {
                label: "Locking",
                options: [
                    {
                        label: "Lock",
                        hotKey: BoardHotKeys.locking.lock,
                        onClick: () => {
                            nodesModel.service.updateManyWithFn(viewState.nodeIds, (node) => ({
                                ...node,
                                locked: true
                            }));
                        }
                    },
                    {
                        label: "Unlock",
                        hotKey: BoardHotKeys.locking.unlock,
                        onClick: () => {
                            nodesModel.service.updateManyWithFn(viewState.nodeIds, (node) => ({
                                ...node,
                                locked: false
                            }));
                        }
                    }
                ]
            },
            {
                options: [
                    {
                        label: "Delete",
                        hotKey: BoardHotKeys.selection.remove[0],
                        onClick: () => {
                            nodesModel.service.removeMany(viewState.nodeIds);

                            setViewState(switchToIdle());
                        },
                        destructive: true
                    }
                ]
            }
        ];
    };

    return { create };
}
