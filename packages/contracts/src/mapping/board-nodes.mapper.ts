import { type AnyNode, AnyNodeZodSchema, type NodeTypes, NodeTypesArray } from "@repo/boards";
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

    public static fromGrpc(node: AnyBoardNodeGrpc): AnyNode {
        let type: NodeTypes | undefined;
        for (const key in node) {
            if (NodeTypesArray.includes(key as NodeTypes)) {
                type = node[key]?.base?.type;
            }
        }

        if (!type) {
            throw new Error("Node type not provided");
        }

        return AnyNodeZodSchema.parse({
            ...node[type],
            ...node[type]?.base
        });
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
