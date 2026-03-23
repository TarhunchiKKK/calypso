import { Controller, Inject } from "@nestjs/common";
import { Ctx, EventPattern, Payload, type RmqContext } from "@nestjs/microservices";
import { RmqRoutingKeys, RmqService } from "@repo/api";

@Controller()
export class BoardsRmqController {
    public constructor(@Inject(RmqService) private readonly rmqService: RmqService) {}

    @EventPattern(RmqRoutingKeys.boards.events.nodesChanged)
    public nodesChanged(@Payload() boardId: string, @Ctx() context: RmqContext) {
        try {
        } catch (error) {}
    }
}
