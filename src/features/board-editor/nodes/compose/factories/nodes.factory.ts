import { Point } from "@/features/board-editor/core";
import { StickerNodeWrapper } from "../../variants/sticker/wrapper";
import { DefaultNodePayloadsMap } from "../constants/default-node-payloads.map";

export class NodesFactory {
    public static sticker(point: Point) {
        const payload = DefaultNodePayloadsMap["sticker"];

        return new StickerNodeWrapper({
            id: crypto.randomUUID(),
            ...payload,
            rect: {
                ...point,
                ...payload.rect
            }
        });
    }
}
