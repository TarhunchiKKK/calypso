import { HotKeysMap } from "@/board-editor/lib/hot-keys.lib";
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
                        hotKey: HotKeysMap.exchangeBuffer.copy,
                        onClick: () => {
                            // IMPLEMENTATION
                        }
                    },
                    {
                        label: "Cut",
                        hotKey: HotKeysMap.exchangeBuffer.cut,
                        onClick: () => setViewState(switchToIdle())
                    }
                ]
            },
            {
                label: "Locking",
                options: [
                    {
                        label: "Lock",
                        hotKey: HotKeysMap.locking.lock,
                        onClick: () => {
                            nodesModel.service.updateManyWithFn(viewState.selectedIds, node => ({
                                ...node,
                                locked: true
                            }));
                        }
                    },
                    {
                        label: "Unlock",
                        hotKey: HotKeysMap.locking.unlock,
                        onClick: () => {
                            nodesModel.service.updateManyWithFn(viewState.selectedIds, node => ({
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
                        hotKey: HotKeysMap.selection.remove[0],
                        onClick: () => {
                            nodesModel.service.removeMany(viewState.selectedIds);

                            setViewState(switchToIdle());
                        }
                    }
                ]
            }
        ];
    };

    return { create };
}
