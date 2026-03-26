import { BoardNodeBaseGrpc, BoardNodeGrpc, ShapeBoardNodeGrpc, StickerBoardNodeGrpc, TextBoardNodeGrpc } from "@repo/api";
import { Boards, DebugException } from "@repo/common";
import { AnyNode } from "@repo/common/dist/boards";


export class NodesGrpcMapper {
   

    public  static mapNode(node: AnyNode): BoardNodeGrpc {
        switch (node.type) {
                    case "sticker": 
                        return  {
                            sticker:  NodesGrpcMapper.mapSticker(node) ,
                        }
                    case "text": 
                        return  {
                            text:  NodesGrpcMapper.mapText(node) 
                        }
                    case "shape": 
                        return  {
                            shape:  NodesGrpcMapper.mapShape(node) 
                        }
                    default: 
                        throw new DebugException("NodesGrpcMapper: Unknown node type")
                } 
    }

    private static mapBase(node: AnyNode): BoardNodeBaseGrpc {
        return {
            id: node.id,
            type: node.type,
            locked: node.locked,
            styles: node.styles
        }
    } 

    private static mapSticker(node: Boards.StickerNode): StickerBoardNodeGrpc {
        return {
            base: NodesGrpcMapper.mapBase(node),
            rect: node.rect,
            text: node.text
        }
    }

    private static mapText(node: Boards.TextNode): TextBoardNodeGrpc {
        return {
            base: NodesGrpcMapper.mapBase(node),
            rect: node.rect,

            // FIX: add appropriate type
            text: []
        }
    }

    private static mapShape(node: Boards.ShapeNode): ShapeBoardNodeGrpc {
        return {
            base: NodesGrpcMapper.mapBase(node),
            rect: node.rect,
            variant: node.variant
        }
    }
}