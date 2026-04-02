import type { ArrowNode, NodeBase, NodeTypes, ShapeNode, StickerNode, TextNode } from "@repo/common/boards/index";
import type { NodeWrapper } from "@/board-editor/core";
import { resolveArrowAbsolutePosition } from "@/board-editor/modules/arrows-resolution";
import { ArrowNodeWrapper } from "../../variants/arrow/arrow-node.wrapper";
import { ShapeNodeWrapper } from "../../variants/shape/shape-node.wrapper";
import { StickerNodeWrapper } from "../../variants/sticker/sticker.wrapper";
import { TextNodeWrapper } from "../../variants/text/text-node.wrapper";

type WrappersMap = {
    sticker: StickerNodeWrapper;
    arrow: ArrowNodeWrapper;
    text: TextNodeWrapper;
    shape: ShapeNodeWrapper;
};

export class NodeWrappersFactory {
    public static wrap(allNodes: NodeBase[], node: NodeBase) {
        switch (node.type) {
            case "sticker":
                return new StickerNodeWrapper(node as StickerNode);
            case "arrow":
                return new ArrowNodeWrapper(
                    node as ArrowNode,
                    resolveArrowAbsolutePosition(allNodes, node as ArrowNode)
                );
            case "text":
                return new TextNodeWrapper(node as TextNode);
            case "shape":
                return new ShapeNodeWrapper(node as ShapeNode);
            default:
                throw new Error(`Unknown node type: ${node}`);
        }
    }

    public static is<T extends NodeTypes>(wrapper: NodeWrapper, type: T): wrapper is WrappersMap[T] {
        return wrapper.type === type;
    }
}
