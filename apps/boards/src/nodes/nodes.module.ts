import { Module } from "@nestjs/common";
import { NodesController } from "./nodes.controller";
import { NodesService } from "./nodes.service";
import { MongooseModule } from "@nestjs/mongoose";
import { NodeBase, NodeBaseSchema } from "./schemas/core/node-base.schema";
import { NodeStyles, NodeStylesSchema } from "./schemas/core/node-styles.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: NodeBase.name,
                schema: NodeBaseSchema
            },
            {
                name: NodeStyles.name,
                schema: NodeStylesSchema
            }
        ])
    ],
    controllers: [NodesController],
    providers: [NodesService]
})
export class NodesModule {}
