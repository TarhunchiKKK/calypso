import type { Point } from "@/shared/lib/geometry";
import type { ShapeVariants } from "../../variants/shape/shape-node.type";
import { ShapeNodeNodeWrapper } from "../../variants/shape/shape-node.wrapper";
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

    public static shape(point: Point, variant: ShapeVariants) {
        const creator = NodeCreatorsMap.shape;

        return new ShapeNodeNodeWrapper(creator(point, variant));
    }
}
