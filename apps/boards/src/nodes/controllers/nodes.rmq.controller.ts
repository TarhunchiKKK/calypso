import { Body, Controller, Inject, UsePipes, ValidationPipe } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { BrokerAcknowledgement, BrokerRoutingKeys } from "@repo/api";
import type { Id } from "@repo/common";
// biome-ignore lint/style/useImportType: Class import is needed for validation.
import { NodesArray } from "../dto/nodes-array.dto";
// biome-ignore lint/style/useImportType: Class import is needed for validation.
import { RemoveManyNodesDto } from "../dto/remove-many-nodes.dto";
import { NodesService } from "../nodes.service";

@Controller()
export class NodesRmqController {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    @MessagePattern(BrokerRoutingKeys.boards.nodes.createMany)
    @UsePipes(ValidationPipe)
    @BrokerAcknowledgement({ requeue: true, loggerContext: NodesRmqController.name })
    public async createMany(@Body() nodes: NodesArray) {
        return this.nodesService.createMany(nodes.data);
    }

    @MessagePattern(BrokerRoutingKeys.boards.nodes.updateMany)
    @UsePipes(ValidationPipe)
    @BrokerAcknowledgement({ requeue: true, loggerContext: NodesRmqController.name })
    public async updateMany(@Body() nodes: NodesArray) {
        return this.nodesService.updateMany(nodes.data);
    }

    @MessagePattern(BrokerRoutingKeys.boards.nodes.removeMany)
    @UsePipes(ValidationPipe)
    @BrokerAcknowledgement({ requeue: true, loggerContext: NodesRmqController.name })
    public async removeMany(@Body() dto: RemoveManyNodesDto) {
        return this.nodesService.removeMany(dto.ids, dto.boardId);
    }

    @MessagePattern(BrokerRoutingKeys.boards.events.boardRemoved)
    @BrokerAcknowledgement({ requeue: true, loggerContext: NodesRmqController.name })
    public async handleBoardRemoved(@Payload() boardId: Id) {
        await this.nodesService.removeNodesByBoard(boardId);
    }
}
