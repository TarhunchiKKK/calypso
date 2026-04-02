import { type Boards, DebugException, type NoNullableFields } from "@repo/common";
import type {
    ArrowBoardNodeGrpc,
    BoardNodeBaseGrpc,
    BoardNodeGrpc,
    ShapeBoardNodeGrpc,
    StickerBoardNodeGrpc,
    TextBoardNodeGrpc
} from "../generated";

export class BoardNodesGrpcMapper {
    public static toGrpc(node: Boards.AnyNode): BoardNodeGrpc {
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
                return {
                    text: {
                        base: BoardNodesGrpcMapper.mapBase(node),
                        rect: node.rect,

                        // FIX: add appropriate type
                        text: []
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
            default:
                throw new DebugException("NodesGrpcMapper: Unknown node type");
        }
    }

    public static fromGrpc(node: BoardNodeGrpc): Boards.AnyNode {
        if (node.sticker) {
            const { base, ...specific } = node.sticker as NoNullableFields<StickerBoardNodeGrpc>;
            return { ...(base as Boards.NodeBase), ...specific, type: "sticker" };
        }

        if (node.arrow) {
            const { base, ...specific } = node.arrow as NoNullableFields<ArrowBoardNodeGrpc>;

            return {
                ...(base as Boards.NodeBase),
                ...specific,
                type: "arrow"
            };
        }

        if (node.text) {
            const { base, ...specific } = node.text as NoNullableFields<TextBoardNodeGrpc>;

            // FIX: remove `text: ""`
            return { ...(base as Boards.NodeBase), ...specific, type: "text", text: "" };
        }

        if (node.shape) {
            const { base, ...specific } = node.shape as NoNullableFields<ShapeBoardNodeGrpc>;
            return {
                ...(base as Boards.NodeBase),
                ...specific,
                type: "shape",
                variant: specific.variant as Boards.ShapeVariants
            };
        }

        throw new DebugException(`NodesGrpcMapper: Unknown node type: ${node} `);
    }

    private static mapBase(node: Boards.AnyNode): BoardNodeBaseGrpc {
        return {
            id: node.id,
            type: node.type,
            locked: node.locked,
            styles: node.styles
        };
    }
}
