import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NodesController } from "./nodes.controller";
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
    controllers: [NodesController],
    providers: [NodesService]
})
export class NodesModule {}
