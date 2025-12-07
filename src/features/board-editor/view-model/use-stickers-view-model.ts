import { Sticker } from "../nodes/variants/sticker";
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
                    if (!canvasRect) {
                        console.log("Empty canvas");
                        return;
                    }

                    const x = e.clientX - canvasRect.x;
                    const y = e.clientY - canvasRect.y;

                    nodesModel.add(
                        new Sticker({
                            id: crypto.randomUUID(),
                            x,
                            y,
                            width: 100,
                            height: 100,
                            text: "Hello"
                        })
                    );
                }
            }
        };
    };
}
