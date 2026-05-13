import {
    type AnyNode,
    ArrowNodeZodSchema,
    DrawingNodeZodSchema,
    MediaNodeZodSchema,
    NoteNodeZodSchema,
    ShapeNodeZodSchema,
    StickerNodeZodSchema,
    TextNodeZodSchema
} from "@repo/boards-common";
import { DebugException } from "@repo/common";
import type { AnyBoardNodeGrpc, BoardNodeBaseGrpc } from "../generated";

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
                        content: node.content
                    }
                };
            }
            case "drawing": {
                return {
                    drawing: {
                        base: BoardNodesGrpcMapper.mapBase(node),
                        rect: node.rect,
                        points: node.points
                    }
                };
            }
            default:
                throw new DebugException(`Unknown node type: ${node satisfies { type: never }}`);
        }
    }

    // REFACTOR: code for all node types is common
    public static fromGrpc(node: AnyBoardNodeGrpc): AnyNode {
        if (node.sticker) {
            return StickerNodeZodSchema.parse({
                ...node.sticker,
                ...node.sticker.base
            });
        }

        if (node.arrow) {
            return ArrowNodeZodSchema.parse({
                ...node.arrow,
                ...node.arrow.base
            });
        }

        if (node.text) {
            return TextNodeZodSchema.parse({
                ...node.text,
                ...node.text.base
            });
        }

        if (node.shape) {
            return ShapeNodeZodSchema.parse({
                ...node.shape,
                ...node.shape.base
            });
        }

        if (node.media) {
            return MediaNodeZodSchema.parse({
                ...node.media,
                ...node.media.base
            });
        }

        if (node.note) {
            return NoteNodeZodSchema.parse({
                ...node.note,
                ...node.note.base
            });
        }

        if (node.drawing) {
            return DrawingNodeZodSchema.parse({
                ...node.drawing,
                ...node.drawing.base
            });
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
