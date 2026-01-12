import { StickerNodeWrapper } from "../variants/sticker/wrapper";
import { AnyNode, NodeTypes } from "./types";
import { SelectedNodeDecorator } from "../../modules/selection";
import { Point, Decoratable } from "../../core";
import { StickerNodeResizeStrategy } from "../variants/sticker/lib/resize.strategy";
import { ResizeDirection, ResizeStrategy } from "../../modules/resizing";
import { ResizableNodeDecorator } from "../../modules/resizing/lib/resizable-node.decorator";

const WrapperConstructors = {
    sticker: StickerNodeWrapper
};

const ResizeStrategies: Record<
    NodeTypes,
    new (nodeId: string, handler: (nodeId: string, direction: ResizeDirection) => void) => ResizeStrategy
> = {
    sticker: StickerNodeResizeStrategy
} as const;

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

    public static select(node: Decoratable<AnyNode>) {
        return new SelectedNodeDecorator(node);
    }

    public resizable(node: Decoratable<AnyNode>, handler: (nodeId: string, direction: ResizeDirection) => void) {
        const ResizeStrategy = ResizeStrategies[node.type];
        return new ResizableNodeDecorator(node, new ResizeStrategy(node.id, handler));
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
