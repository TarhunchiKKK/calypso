import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { NodesHttpService } from "./nodes.http.service";
import { Boards } from "@repo/common";
import { NodesRmqService } from "./nodes.rmq.service";

@Controller("board-nodes")
export class NodesController {
    public constructor(
        @Inject(NodesHttpService) private readonly nodesHttpService: NodesHttpService,
        @Inject(NodesRmqService) private readonly nodesRmqService: NodesRmqService
    ) {}

    @Post()
    public createMany(@Body() nodes: Boards.NodeBase[]) {
        return this.nodesRmqService.createMany(nodes)
    }

    @Get(":boardId")
    public findAll(@Param("boardId") boardId: string) {
        return this.nodesHttpService.findAll(boardId);
    }

    @Patch()
    public updateMany(@Body() nodes: Boards.NodeBase[]) {
        return this.nodesRmqService.updateMany(nodes);
    }

    @Delete()
    public removeMany(@Body() ids: string[]) {
        return this.nodesRmqService.removeMany(ids);
    }
}
