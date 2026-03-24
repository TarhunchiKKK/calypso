import { Controller, Get, Inject, Param } from "@nestjs/common";
import type { Id } from "@repo/common";
import { NodesService } from "../nodes.service";

@Controller("nodes")
export class NodesHttpController {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    @Get(":id")
    public async findOne(@Param("id") boardId: Id) {
        return this.nodesService.findAll(boardId);
    }
}
