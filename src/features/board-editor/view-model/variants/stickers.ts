import { OmitFields } from "@/shared/lib/typescript";
import { Geometry } from "../../domain/geometry";
import { NodesFactory } from "../../nodes/compose/nodes-factory";
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

    return (): OmitFields<ViewModel, "actions"> => {
        return {
            nodes: nodesModel.nodes.map(node => node.clone()),
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
