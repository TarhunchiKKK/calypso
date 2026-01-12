import { StickerNodeWrapper } from "../variants/sticker/wrapper";
import { AnyNode } from "./types";
import { SelectedNodeDecorator } from "../../modules/selection";
import { Point, Decoratable, NodeBase } from "../../core";
import { ResizeHandler } from "../../modules/resizing";
import { ResizableNodeDecorator } from "../../modules/resizing/lib/resizable-node.decorator";
import { WrapperConstructorsMap } from "./constants/wrapper-constructors.map";
import { ResizeStrategiesMap } from "./constants/resize-strategies.map";
import { DefaultNodePayloadsMap } from "./constants/default-node-payloads.map";

export class NodesFactory {
    public static wrap(node: NodeBase) {
        const Wrapper = WrapperConstructorsMap[node.type];

        if (!Wrapper) {
            throw Error("Unknown node type");
        }

        return new Wrapper(node as AnyNode);
    }

    public static select(node: Decoratable) {
        return new SelectedNodeDecorator(node);
    }

    public static resizable(node: Decoratable, handler?: ResizeHandler) {
        const ResizeStrategy = ResizeStrategiesMap[node.type];
        return new ResizableNodeDecorator(node, new ResizeStrategy(handler));
    }

    public static sticker(point: Point) {
        const payload = DefaultNodePayloadsMap["sticker"];

        return new StickerNodeWrapper({
            id: crypto.randomUUID(),
            ...point,
            ...payload
        });
    }
}
