import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CreateManyNodesCommandHandler } from "./handlers/create-many-nodes.handler";
import { FindAllNodesQuery } from "./handlers/find-all-nodes.handler";
import { RemoveManyNodesCommandHandler } from "./handlers/remove-many-nodes.handler";
import { RemoveNodesByBoardCommandHandler } from "./handlers/remove-nodes-by-board.handler";
import { ReplaceManyNodesCommandHandler } from "./handlers/replace-many-nodes.handler";
import { NodesController } from "./nodes.controller";
import { NodesService } from "./nodes.service";
import { Rect, RectSchema } from "./schemas/core/geometry.schemas";
import { NodeBase, NodeBaseSchema } from "./schemas/core/node-base.schema";
import { NodeStyles, NodeStylesSchema } from "./schemas/core/node-styles.schema";
import { STICKER_NODE_DISCRIMINATOR_VALUE, StickerNode, StickerNodeSchema } from "./schemas/variants/sticker-node.schema";
import { TEXT_NODE_DISCRIMINATOR_VALUE, TextNode, TextNodeSchema } from "./schemas/variants/text-node.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: NodeBase.name,
                schema: NodeBaseSchema,
                discriminators: [
                    {
                        name: StickerNode.name,
                        schema: StickerNodeSchema,
                        value: STICKER_NODE_DISCRIMINATOR_VALUE
                    },
                    {
                        name: TextNode.name,
                        schema: TextNodeSchema,
                        value: TEXT_NODE_DISCRIMINATOR_VALUE
                    }
                ]
            },
            {
                name: NodeStyles.name,
                schema: NodeStylesSchema
            },
            {
                name: Rect.name,
                schema: RectSchema
            }
        ])
    ],
    controllers: [NodesController],
    providers: [
        NodesService,
        CreateManyNodesCommandHandler,
        FindAllNodesQuery,
        ReplaceManyNodesCommandHandler,
        RemoveManyNodesCommandHandler,
        RemoveNodesByBoardCommandHandler
    ]
})
export class NodesModule {}
