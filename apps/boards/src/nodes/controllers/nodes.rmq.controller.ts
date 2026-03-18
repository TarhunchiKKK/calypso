import { Body, Controller, Inject, UsePipes, ValidationPipe } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { RmqRoutingKeys } from "@repo/api";
// biome-ignore lint/style/useImportType: Class import is needed for validation.
import { NodesArray } from "../dto/nodes-array.dto";
// biome-ignore lint/style/useImportType: Class import is needed for validation.
import { RemoveManyNodesDto } from "../dto/remove-many-nodes.dto";
import { NodesService } from "../nodes.service";

@Controller()
export class NodesRmqController {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    @MessagePattern(RmqRoutingKeys.boards.nodes.createMany)
    @UsePipes(ValidationPipe)
    public async createMany(@Body() nodes: NodesArray) {
        return this.nodesService.createMany(nodes.data);
    }

    @MessagePattern(RmqRoutingKeys.boards.nodes.updateMany)
    @UsePipes(ValidationPipe)
    public async updateMany(@Body() nodes: NodesArray) {
        return this.nodesService.updateMany(nodes.data);
    }

    @MessagePattern(RmqRoutingKeys.boards.nodes.removeMany)
    @UsePipes(ValidationPipe)
    public async removeMany(@Body() dto: RemoveManyNodesDto) {
        return this.nodesService.removeMany(dto.ids);
    }
}
