import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { NodesService } from "./nodes.service";
import { CreateNodeDto } from "./dto/create-node.dto";
import { UpdateNodeDto } from "./dto/update-node.dto";

@Controller("nodes")
export class NodesController {
    public constructor(private readonly nodesService: NodesService) {}

    @Post()
    public async createMany(@Body() createNodeDto: CreateNodeDto) {
        return this.nodesService.createMany(createNodeDto);
    }

    @Get(":id")
    public async findOne(@Param("id") boardId: string) {
        return this.nodesService.findAll(boardId);
    }

    @Patch()
    public async updateMany(@Body() updateNodeDto: UpdateNodeDto) {
        return this.nodesService.updateMany(updateNodeDto);
    }

    @Delete(":id")
    public async removeMany(@Param("id") id: string) {
        return this.nodesService.removeMany(id);
    }
}
