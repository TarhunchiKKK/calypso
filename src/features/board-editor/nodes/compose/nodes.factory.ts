import { StickerNodeWrapper } from "../variants/sticker/wrapper";
import { AnyNode } from "./types";
import { SelectedNodeDecorator } from "../../modules/selection";
import { Point, Decoratoratable } from "../../core";

const WrapperConstructors = {
    sticker: StickerNodeWrapper
};

const DefaultNodePayloads = {
    sticker: {
        type: "sticker" as const,
        width: 100,
        height: 100,
        text: "Hello"
    }
};

export class NodesFactory {
    public static wrap(node: AnyNode) {
        const Wrapper = WrapperConstructors[node.type];

        if (!Wrapper) {
            throw Error("Unknown node type");
        }

        return new Wrapper(node);
    }

    public static select(node: Decoratoratable<AnyNode>) {
        return new SelectedNodeDecorator(node);
    }

    public static sticker(point: Point) {
        const payload = DefaultNodePayloads["sticker"];

        return new StickerNodeWrapper({
            id: crypto.randomUUID(),
            ...point,
            ...payload
        });
    }
}
