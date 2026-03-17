import { Controller, Get, Inject, Param } from "@nestjs/common";
import { NodesHttpService } from "./nodes.http.service";

@Controller("board-nodes")
export class NodesHttpController {
    public constructor(@Inject(NodesHttpService) private readonly nodesHttpService: NodesHttpService) {}

    @Get(":boardId")
    public findAll(@Param("boardId") boardId: string) {
        return this.nodesHttpService.findAll(boardId);
    }
}
