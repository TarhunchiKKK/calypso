import type { OnlyIdDto } from "@api/common";
import { BoardsBrokerContracts } from "@contracts/broker";
import { Controller, Inject } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { NodesService } from "../nodes.service";

@Controller()
export class NodesRmqController {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    @EventPattern(BoardsBrokerContracts.boardRemoved.pattern)
    // @BrokerAcknowledgement({ requeue: true, loggerContext: NodesRmqController.name })
    public async handleBoardRemoved(@Payload() payload: OnlyIdDto) {
        await this.nodesService.removeNodesByBoard(payload.id);
    }
}
