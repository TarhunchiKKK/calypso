import { Geometry } from "../domain/geometry";
import { NodesFactory } from "../nodes/compose/nodes-factory";
import { ViewModel, ViewModelParams } from "./types";

export type StickersViewState = {
    type: "stickers";
};

export function useStickersViewModel({ nodesModel, canvasRect }: ViewModelParams) {
    return (): ViewModel => {
        return {
            nodes: nodesModel.nodes,
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
