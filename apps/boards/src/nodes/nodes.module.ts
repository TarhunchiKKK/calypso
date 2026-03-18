import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NodesHttpController } from "./controllers/nodes.http.controller";
import { NodesRmqController } from "./controllers/nodes.rmq.controller";
import { CreateManyNodesCommandHandler } from "./handlers/create-many-nodes.handler";
import { FindAllNodesQueryHandler } from "./handlers/find-all-nodes.handler";
import { RemoveManyNodesCommandHandler } from "./handlers/remove-many-nodes.handler";
import { UpdateManyNodesCommandHandler } from "./handlers/update-many-nodes.handler";
import { NodesService } from "./nodes.service";
import { NodeBase, NodeBaseSchema } from "./schemas/node-base.schema";
import { ShapeNode, ShapeNodeSchema } from "./schemas/shape-node.schema";
import { StickerNode, StickerNodeSchema } from "./schemas/sticker-node.schema";
import { TextNode, TextNodeSchema } from "./schemas/text-node.schema";

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: NodeBase.name,
                useFactory: () => {
                    const schema = NodeBaseSchema;

                    schema.discriminator(StickerNode.name, StickerNodeSchema);
                    schema.discriminator(TextNode.name, TextNodeSchema);
                    schema.discriminator(ShapeNode.name, ShapeNodeSchema);

                    return schema;
                }
            }
        ])
    ],
    controllers: [NodesHttpController, NodesRmqController],
    providers: [
        NodesService,
        CreateManyNodesCommandHandler,
        FindAllNodesQueryHandler,
        UpdateManyNodesCommandHandler,
        RemoveManyNodesCommandHandler
    ]
})
export class NodesModule {}
