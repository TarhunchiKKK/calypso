import type { ArrowNode, DrawingNode, MediaNode, NodeBase, NodeTypes, NoteNode, ShapeNode, StickerNode, TextNode } from "@repo/boards";
import type { NodeWrapper } from "@/board-editor/core";
import { resolveArrowAbsolutePosition } from "@/board-editor/modules/arrows-resolution";
import { ArrowNodeWrapper } from "../../variants/arrow/wrapper";
import { DrawingNodeWrapper } from "../../variants/drawing/wrapper";
import { MediaNodeWrapper } from "../../variants/media/wrapper";
import { NoteNodeWrapper } from "../../variants/note/wrapper";
import { ShapeNodeWrapper } from "../../variants/shape/wrapper";
import { StickerNodeWrapper } from "../../variants/sticker/wrapper";
import { TextNodeWrapper } from "../../variants/text/wrapper";

type WrappersMap = {
    sticker: StickerNodeWrapper;
    arrow: ArrowNodeWrapper;
    text: TextNodeWrapper;
    shape: ShapeNodeWrapper;
    media: MediaNodeWrapper;
    note: NoteNodeWrapper;
    drawing: DrawingNodeWrapper;
};

export class NodeWrappersFactory {
    public static is<T extends NodeTypes>(wrapper: NodeWrapper, type: T): wrapper is WrappersMap[T] {
        return wrapper.type === type;
    }

    public static wrap(allNodes: NodeBase[], node: NodeBase) {
        switch (node.type) {
            case "sticker":
                return new StickerNodeWrapper(node as StickerNode);
            case "arrow":
                return new ArrowNodeWrapper(node as ArrowNode, resolveArrowAbsolutePosition(allNodes, node as ArrowNode));
            case "text":
                return new TextNodeWrapper(node as TextNode);
            case "shape":
                return new ShapeNodeWrapper(node as ShapeNode);
            case "media":
                return new MediaNodeWrapper(node as MediaNode);
            case "note":
                return new NoteNodeWrapper(node as NoteNode);
            case "drawing":
                return new DrawingNodeWrapper(node as DrawingNode);
            default:
                throw new Error(`Unknown node type: ${node.type satisfies never}`);
        }
    }
}
