import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { CreateAnyNodeZodSchema, type RemoveManyNodesDto, type RemoveOneNodeDto, ReplaceAnyNodeZodSchema } from "@repo/common";
import { Validation } from "src/shared/validation";
import z from "zod";
import { BoardCreator } from "../boards/middleware/board-creator.guard";
import type { CreateNodeDto } from "./dto/create-node.dto";
import type { ReplaceNodeDto } from "./dto/replace-node.dto";
import type { NodesService } from "./nodes.service";

// TODO: BoardCreatorGuard

@Controller("nodes")
export class NodesController {
    public constructor(private readonly nodesService: NodesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Validation(z.object(CreateAnyNodeZodSchema))
    @BoardCreator(request => ({ id: request?.body?.boardId }))
    public async createOne(@Body() dto: CreateNodeDto) {
        return await this.nodesService.createOne(dto);
    }

    @Post("bulk")
    @HttpCode(HttpStatus.CREATED)
    @BoardCreator(request => ({ id: request?.body?.[0]?.boardId }))
    @Validation(z.array(CreateAnyNodeZodSchema))
    public async createMany(@Body() dtos: CreateNodeDto[]) {
        return await this.nodesService.createMany(dtos);
    }

    @Get(":boardId")
    @HttpCode(HttpStatus.OK)
    public async findAll(@Param("boardId") boardId: string) {
        return await this.nodesService.findAll(boardId);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    @Validation(z.object(ReplaceAnyNodeZodSchema))
    @BoardCreator(request => ({ id: request?.body?.boardId }))
    public async replaceOne(@Body() dto: ReplaceNodeDto) {
        return await this.nodesService.replaceOne(dto);
    }

    @Put("bulk")
    @HttpCode(HttpStatus.OK)
    @Validation(z.array(ReplaceAnyNodeZodSchema))
    @BoardCreator(request => ({ id: request?.body?.[0]?.boardId }))
    public async replaceMany(@Body() dtos: ReplaceNodeDto[]) {
        return await this.nodesService.replaceMany(dtos);
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    @BoardCreator(request => ({ id: request?.body?.boardId }))
    public async removeOne(@Body() dto: RemoveOneNodeDto) {
        return await this.nodesService.removeOne(dto.id);
    }

    @Delete("bulk")
    @HttpCode(HttpStatus.NO_CONTENT)
    @BoardCreator(request => ({ id: request?.body?.boardId }))
    public async removeMany(@Body() dto: RemoveManyNodesDto) {
        return await this.nodesService.removeMany(dto.ids);
    }
}
