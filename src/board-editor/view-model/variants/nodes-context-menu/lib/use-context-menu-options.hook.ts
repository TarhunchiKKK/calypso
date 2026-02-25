import { HotKeysMap } from "../../../lib/hot-keys-map.constants";
import type { ViewModelParams } from "../../../types";
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
                        onClick: () => {}
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
                            nodesModel.service.updateManyWithFn(viewState.selectedIds, node => ({ ...node, blocked: true }));
                        }
                    },
                    {
                        label: "Unlock",
                        hotKey: HotKeysMap.locking.unlock,
                        onClick: () => {
                            nodesModel.service.updateManyWithFn(viewState.selectedIds, node => ({ ...node, blocked: false }));
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
