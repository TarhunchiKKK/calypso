import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import type { Boards } from "@repo/common";
import { NodesHttpService } from "./nodes.http.service";
import { NodesBrokerAcknowledgementService } from "./nodes.rmq.service";

@Controller("board-nodes")
export class NodesController {
    public constructor(
        @Inject(NodesHttpService) private readonly nodesHttpService: NodesHttpService,
        @Inject(NodesBrokerAcknowledgementService)
        private readonly nodesBrokerAcknowledgementService: NodesBrokerAcknowledgementService
    ) {}

    @Post()
    public createMany(@Body() nodes: Boards.NodeBase[]) {
        return this.nodesBrokerAcknowledgementService.createMany(nodes);
    }

    @Get(":boardId")
    public findAll(@Param("boardId") boardId: string) {
        return this.nodesHttpService.findAll(boardId);
    }

    @Patch()
    public updateMany(@Body() nodes: Boards.NodeBase[]) {
        return this.nodesBrokerAcknowledgementService.updateMany(nodes);
    }

    @Delete()
    public removeMany(@Body() ids: string[]) {
        return this.nodesBrokerAcknowledgementService.removeMany(ids);
    }
}
