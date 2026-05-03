import type { AnyNode, ArrowNode, NodeBase, NoteNode, ShapeNode, ShapeVariants, StickerNode, TextNode } from "@repo/boards-common";
import { DebugException, type NoNullableFields } from "@repo/common";
import type {
    AnyBoardNodeGrpc,
    ArrowBoardNodeGrpc,
    BoardNodeBaseGrpc,
    MediaBoardNodeGrpc,
    NoteBoardNodeGrc,
    ShapeBoardNodeGrpc,
    StickerBoardNodeGrpc,
    TextBoardNodeGrpc
} from "../generated";
import { FormatableMapper } from "./formatable.mapper";

export class BoardNodesGrpcMapper {
    public static toGrpc(node: AnyNode): AnyBoardNodeGrpc {
        switch (node.type) {
            case "sticker":
                return {
                    sticker: {
                        base: BoardNodesGrpcMapper.mapBase(node),
                        rect: node.rect,
                        text: node.text
                    }
                };
            case "arrow": {
                return {
                    arrow: {
                        base: BoardNodesGrpcMapper.mapBase(node),
                        start: node.start,
                        end: node.end,
                        text: node.text
                    }
                };
            }
            case "text":
                node.content;
                return {
                    text: {
                        base: BoardNodesGrpcMapper.mapBase(node),
                        rect: node.rect,
                        content: node.content
                    }
                };
            case "shape":
                return {
                    shape: {
                        base: BoardNodesGrpcMapper.mapBase(node),
                        rect: node.rect,
                        variant: node.variant
                    }
                };
            case "media":
                return {
                    media: {
                        base: BoardNodesGrpcMapper.mapBase(node),
                        rect: node.rect,
                        url: node.url
                    }
                };
            case "note": {
                return {
                    note: {
                        base: BoardNodesGrpcMapper.mapBase(node),
                        rect: node.rect,
                        content: node.content.map(FormatableMapper.toGrpc)
                    }
                };
            }
            default:
                throw new DebugException("NodesGrpcMapper: Unknown node type");
        }
    }

    public static fromGrpc(node: AnyBoardNodeGrpc): AnyNode {
        if (node.sticker) {
            const sticker = node.sticker as NoNullableFields<StickerBoardNodeGrpc>;

            return {
                ...(sticker.base as NodeBase & Pick<StickerNode, "styles">),
                type: "sticker",
                rect: sticker.rect,
                text: sticker.text
            };
        }

        if (node.arrow) {
            const { base, ...specific } = node.arrow as NoNullableFields<ArrowBoardNodeGrpc>;

            return {
                ...(base as NodeBase & Pick<ArrowNode, "styles">),
                ...specific,
                type: "arrow"
            };
        }

        if (node.text) {
            const text = node.text as NoNullableFields<TextBoardNodeGrpc>;

            return {
                ...(text.base as NodeBase & Pick<TextNode, "styles">),
                type: "text",
                rect: text.rect,
                content: text.content.map(element => ({
                    children: element.children,
                    type: "paragraph"
                }))
            };
        }

        if (node.shape) {
            const shape = node.shape as NoNullableFields<ShapeBoardNodeGrpc>;

            return {
                ...(shape.base as NodeBase & Pick<ShapeNode, "styles">),
                type: "shape",
                rect: shape.rect,
                variant: shape.variant as ShapeVariants
            };
        }

        if (node.media) {
            const media = node.media as NoNullableFields<MediaBoardNodeGrpc>;

            return {
                ...(media.base as NodeBase & Pick<ShapeNode, "styles">),
                type: "media",
                rect: media.rect,
                url: media.url
            };
        }

        if (node.note) {
            const note = node.note as NoNullableFields<NoteBoardNodeGrc>;

            return {
                ...(note.base as NodeBase & Pick<NoteNode, "styles">),
                type: "note",
                rect: note.rect,
                content: node.note.content.map(FormatableMapper.fromGrpc)
            };
        }

        throw new DebugException(`NodesGrpcMapper: Unknown node type: ${node} `);
    }

    private static mapBase(node: AnyNode): BoardNodeBaseGrpc {
        return {
            id: node.id,
            type: node.type,
            locked: node.locked,
            styles: node.styles
        };
    }
}
