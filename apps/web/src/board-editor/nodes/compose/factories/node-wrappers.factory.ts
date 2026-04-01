import type { Boards } from "@repo/common";
import { ArrowNodeWrapper } from "../../variants/arrow/arrow-node.wrapper";
import { ShapeNodeWrapper } from "../../variants/shape/shape-node.wrapper";
import { StickerNodeWrapper } from "../../variants/sticker/sticker.wrapper";
import { TextNodeWrapper } from "../../variants/text/text-node.wrapper";
import type { NodeWrapper } from "@/board-editor/core";
import type { ArrowNode } from "@repo/common/boards/index";
import { resolveArrowAbsolutePosition } from "@/board-editor/modules/arrows-resolution";

type WrappersMap = {
    sticker: StickerNodeWrapper;
    arrow: ArrowNodeWrapper;
    text: TextNodeWrapper;
    shape: ShapeNodeWrapper;
};

export class NodeWrappersFactory {
    public static wrap(allNodes: Boards.NodeBase[], node: Boards.NodeBase) {
        switch (node.type) {
            case "sticker":
                return new StickerNodeWrapper(node as Boards.StickerNode);
            case "arrow":
                const absolutePosition = resolveArrowAbsolutePosition(allNodes, node as ArrowNode);
                return new ArrowNodeWrapper(node as Boards.ArrowNode, absolutePosition);
            case "text":
                return new TextNodeWrapper(node as Boards.TextNode);
            case "shape":
                return new ShapeNodeWrapper(node as Boards.ShapeNode);
            default:
                throw new Error(`Unknown node type: ${node}`);
        }
    }

    public static is<T extends Boards.NodeTypes>(wrapper: NodeWrapper, type: T): wrapper is WrappersMap[T] {
        return wrapper.type === type;
    }
}
