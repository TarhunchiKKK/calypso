import { Body, Controller, Inject, Logger, UsePipes, ValidationPipe } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, type RmqContext } from "@nestjs/microservices";
import { BrokerAcknowledgementService, BrokerRoutingKeys } from "@repo/api";
// biome-ignore lint/style/useImportType: Class import is needed for validation.
import { NodesArray } from "../dto/nodes-array.dto";
// biome-ignore lint/style/useImportType: Class import is needed for validation.
import { RemoveManyNodesDto } from "../dto/remove-many-nodes.dto";
import { NodesService } from "../nodes.service";

@Controller()
export class NodesRmqController {
    private readonly logger = new Logger(NodesRmqController.name, { timestamp: true });

    public constructor(
        @Inject(NodesService) private readonly nodesService: NodesService,
        @Inject(BrokerAcknowledgementService)
        private readonly brokerService: BrokerAcknowledgementService
    ) {}

    @MessagePattern(BrokerRoutingKeys.boards.nodes.createMany)
    @UsePipes(ValidationPipe)
    public async createMany(@Body() nodes: NodesArray) {
        return this.nodesService.createMany(nodes.data);
    }

    @MessagePattern(BrokerRoutingKeys.boards.nodes.updateMany)
    @UsePipes(ValidationPipe)
    public async updateMany(@Body() nodes: NodesArray) {
        return this.nodesService.updateMany(nodes.data);
    }

    @MessagePattern(BrokerRoutingKeys.boards.nodes.removeMany)
    @UsePipes(ValidationPipe)
    public async removeMany(@Body() dto: RemoveManyNodesDto) {
        return this.nodesService.removeMany(dto.ids, dto.boardId);
    }

    @MessagePattern(BrokerRoutingKeys.boards.events.boardRemoved)
    public async handleBoardRemoved(@Payload() boardId: string, @Ctx() context: RmqContext) {
        try {
            await this.nodesService.removeNodesByBoard(boardId);

            this.brokerService.ack(context);
        } catch (error) {
            this.logger.error(error);

            this.brokerService.nack(context);
        }
    }
}
