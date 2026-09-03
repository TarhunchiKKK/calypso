import type { NodeTypes } from "@lib/boards";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NodesController } from "./controllers/nodes.controller";
import { NodesRmqController } from "./controllers/nodes.rmq.controller";
import { CreateManyNodesCommandHandler } from "./handlers/create-many-nodes.handler";
import { FindAllNodesQueryHandler } from "./handlers/find-all-nodes.handler";
import { RemoveManyNodesCommandHandler } from "./handlers/remove-many-nodes.handler";
import { RemoveNodesByBoardCommandHandler } from "./handlers/remove-nodes-by-board.handler";
import { UpdateManyNodesCommandHandler } from "./handlers/update-many-nodes.handler";
import { NodesService } from "./nodes.service";
import { ArrowNodeSchema } from "./schemas/arrow-node.schema";
import { DrawingNodeSchema } from "./schemas/drawing-node.schema";
import { MediaNodeSchema } from "./schemas/media-node.schema";
import { NodeBase, NodeBaseSchema } from "./schemas/node-base.schema";
import { NoteNodeSchema } from "./schemas/note-node.schema";
import { ShapeNodeSchema } from "./schemas/shape-node.schema";
import { StickerNodeSchema } from "./schemas/sticker-node.schema";
import { TextNodeSchema } from "./schemas/text-node.schema";

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                imports: [],
                name: NodeBase.name,
                useFactory: () => {
                    const schema = NodeBaseSchema;
                    schema.discriminator("sticker" satisfies NodeTypes, StickerNodeSchema);
                    schema.discriminator("arrow" satisfies NodeTypes, ArrowNodeSchema);
                    schema.discriminator("text" satisfies NodeTypes, TextNodeSchema);
                    schema.discriminator("shape" satisfies NodeTypes, ShapeNodeSchema);
                    schema.discriminator("media" satisfies NodeTypes, MediaNodeSchema);
                    schema.discriminator("note" satisfies NodeTypes, NoteNodeSchema);
                    schema.discriminator("drawing" satisfies NodeTypes, DrawingNodeSchema);
                    return schema;
                }
            }
        ])
    ],
    controllers: [NodesController, NodesRmqController],
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
