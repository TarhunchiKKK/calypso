import { Geometry } from "../domain/geometry";
import { NodesFactory } from "../nodes/compose/nodes-factory";
import { ViewModel, ViewModelParams } from "./types";
import { switchToIdle } from "./use-idle-view-model";

export type StickersViewState = {
    type: "stickers";
};

export function switchToStickers(): StickersViewState {
    return {
        type: "stickers"
    };
}

export function useStickersViewModel({ nodesModel, canvasRect, setViewState }: ViewModelParams) {
    return (): ViewModel => {
        return {
            nodes: nodesModel.nodes,
            layout: {
                onKeyDown: e => {
                    if (e.key === "Escape") {
                        setViewState(switchToIdle());
                    }
                }
            },
            canvas: {
                onClick(e) {
                    const clickPoint = Geometry.recalculatePosition(
                        {
                            x: e.clientX,
                            y: e.clientY
                        },
                        canvasRect
                    );

                    nodesModel.add(NodesFactory.sticker(clickPoint));
                }
            },
            actions: {
                idle: {
                    isActive: false,
                    onClick: () => setViewState(switchToIdle())
                },
                stickers: {
                    isActive: true
                }
            }
        };
    };
}
