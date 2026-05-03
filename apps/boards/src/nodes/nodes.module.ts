import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NodesGrpcController } from "./controllers/nodes.grpc.controller";
import { NodesRmqController } from "./controllers/nodes.rmq.controller";
import { CreateManyNodesCommandHandler } from "./handlers/create-many-nodes.handler";
import { FindAllNodesQueryHandler } from "./handlers/find-all-nodes.handler";
import { RemoveManyNodesCommandHandler } from "./handlers/remove-many-nodes.handler";
import { RemoveNodesByBoardCommandHandler } from "./handlers/remove-nodes-by-board.handler";
import { UpdateManyNodesCommandHandler } from "./handlers/update-many-nodes.handler";
import { NodesService } from "./nodes.service";
import { ArrowNode, ArrowNodeSchema } from "./schemas/arrow-node.schema";
import { MediaNode, MediaNodeSchema } from "./schemas/media-node.schema";
import { NodeBase, NodeBaseSchema } from "./schemas/node-base.schema";
import { NoteNode, NoteNodeSchema } from "./schemas/note-node.schema";
import { ShapeNode, ShapeNodeSchema } from "./schemas/shape-node.schema";
import { StickerNode, StickerNodeSchema } from "./schemas/sticker-node.schema";
import { TextNode, TextNodeSchema } from "./schemas/text-node.schema";

export const NodesMongooseModule = MongooseModule.forFeatureAsync([
    {
        imports: [],
        name: NodeBase.name,
        useFactory: () => {
            const schema = NodeBaseSchema;
            schema.discriminator(StickerNode.name, StickerNodeSchema);
            schema.discriminator(ArrowNode.name, ArrowNodeSchema);
            schema.discriminator(TextNode.name, TextNodeSchema);
            schema.discriminator(ShapeNode.name, ShapeNodeSchema);
            schema.discriminator(MediaNode.name, MediaNodeSchema);
            schema.discriminator(NoteNode.name, NoteNodeSchema);
            return schema;
        }
    }
]);

@Module({
    imports: [NodesMongooseModule],
    controllers: [NodesGrpcController, NodesRmqController],
    providers: [
        NodesService,
        CreateManyNodesCommandHandler,
        FindAllNodesQueryHandler,
        UpdateManyNodesCommandHandler,
        RemoveManyNodesCommandHandler,
        RemoveNodesByBoardCommandHandler
    ]
})
export class NodesModule {}
