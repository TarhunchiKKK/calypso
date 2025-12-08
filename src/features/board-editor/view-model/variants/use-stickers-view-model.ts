import { OmitFields } from "@/shared/lib/typescript";
import { Geometry } from "../../domain/geometry";
import { NodesFactory } from "../../nodes/compose/nodes-factory";
import { useHotKeys } from "../hooks/use-hot-keys";
import { ViewModel, ViewModelParams } from "../types";

export type StickersViewState = {
    type: "stickers";
};

export function switchToStickers(): StickersViewState {
    return {
        type: "stickers"
    };
}

export function useStickersViewModel(params: ViewModelParams) {
    const { nodesModel, canvasRect } = params;

    const { handleHotKeys } = useHotKeys(params);

    return (): OmitFields<ViewModel, "actions"> => {
        return {
            nodes: nodesModel.nodes,
            layout: {
                onKeyDown: e => {
                    handleHotKeys(e);
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
            }
        };
    };
}
