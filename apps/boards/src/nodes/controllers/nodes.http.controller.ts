import { Controller, Get, Inject, Param } from "@nestjs/common";
import { NodesService } from "../nodes.service";

@Controller("nodes")
export class NodesHttpController {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    @Get(":id")
    public async findOne(@Param("id") boardId: string) {
        return this.nodesService.findAll(boardId);
    }
}
