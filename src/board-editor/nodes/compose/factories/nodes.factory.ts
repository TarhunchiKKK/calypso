import type { Point } from "@/shared/lib/geometry";
import { StickerNodeWrapper } from "../../variants/sticker/sticker.wrapper";
import { TextNodeWrapper } from "../../variants/text/text-node.wrapper";
import { NodeCreatorsMap } from "../constants/default-node-payloads.map";

export class NodesFactory {
    public static sticker(point: Point) {
        const creator = NodeCreatorsMap.sticker;

        return new StickerNodeWrapper(creator(point));
    }

    public static text(point: Point) {
        const creator = NodeCreatorsMap.text;

        return new TextNodeWrapper(creator(point));
    }
}
