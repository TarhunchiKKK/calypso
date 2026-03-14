import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
// biome-ignore lint/style/useImportType: Class import is needed for validation
import { NodesArray } from "./dto/nodes-array.dto";
import { NodesService } from "./nodes.service";

@Controller("nodes")
export class NodesController {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    @Post()
    @UsePipes(ValidationPipe)
    public async createMany(@Body() nodes: NodesArray) {
        return this.nodesService.createMany(nodes.data);
    }

    @Get(":id")
    public async findOne(@Param("id") boardId: string) {
        return this.nodesService.findAll(boardId);
    }

    @Patch()
    @UsePipes(ValidationPipe)
    public async updateMany(@Body() nodes: NodesArray) {
        return this.nodesService.updateMany(nodes.data);
    }

    @Delete(":id")
    public async removeMany(@Param("id") id: string) {
        return this.nodesService.removeMany(id);
    }
}
