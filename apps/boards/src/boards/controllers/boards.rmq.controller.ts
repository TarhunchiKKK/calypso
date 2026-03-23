import { Controller, Inject, Logger } from "@nestjs/common";
import { Ctx, EventPattern, Payload, type RmqContext } from "@nestjs/microservices";
import { BrokerAcknowledgementService, BrokerRoutingKeys } from "@repo/api";
import { BoardsService } from "../boards.service";

@Controller()
export class BoardsRmqController {
    private readonly logger = new Logger(BoardsRmqController.name, { timestamp: true });

    public constructor(
        @Inject(BoardsService) private readonly boardsService: BoardsService,
        @Inject(BrokerAcknowledgementService)
        private readonly brokerService: BrokerAcknowledgementService
    ) {}

    @EventPattern(BrokerRoutingKeys.boards.events.nodesChanged)
    public async nodesChanged(@Payload() boardId: string, @Ctx() context: RmqContext) {
        try {
            await this.boardsService.changeBoardUpdateDate(boardId);

            this.brokerService.ack(context);
        } catch (error) {
            this.logger.error(error);

            this.brokerService.nack(context);
        }
    }
}
