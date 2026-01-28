import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NodesController } from "./nodes.controller";
import { NodesService } from "./nodes.service";
import { NodeBase, NodeBaseSchema } from "./schemas/node-base.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: NodeBase.name,
                schema: NodeBaseSchema
            }
        ])
    ],
    controllers: [NodesController],
    providers: [NodesService]
})
export class NodesModule {}
