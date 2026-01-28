import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import {
    CreateAnyNodeZodSchema,
    type RemoveManyNodesDto,
    RemoveManyNodesDtoZodSchema,
    type RemoveOneNodeDto,
    RemoveOneNodeDtoZodSchema,
    ReplaceAnyNodeZodSchema
} from "@repo/common";
import { Authorization } from "src/core/auth";
import { Validation } from "src/shared/validation";
import z from "zod";
import { BoardCreator } from "../boards/middleware/board-creator.guard";
import type { CreateNodeDto } from "./dto/create-node.dto";
import type { ReplaceNodeDto } from "./dto/replace-node.dto";
import type { NodesService } from "./nodes.service";
import { NodeApiType } from "./swagger/node.api-type";

@Controller("nodes")
@Authorization()
@ApiTags("cats")
export class NodesController {
    public constructor(private readonly nodesService: NodesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Validation(z.object(CreateAnyNodeZodSchema))
    @BoardCreator(request => ({ id: request?.body?.boardId }))
    @ApiCreatedResponse({ description: "Node successfully created", type: NodeApiType })
    public async createOne(@Body() dto: CreateNodeDto) {
        return await this.nodesService.createOne(dto);
    }

    @Post("bulk")
    @HttpCode(HttpStatus.CREATED)
    @Validation(z.array(CreateAnyNodeZodSchema))
    @BoardCreator(request => ({ id: request?.body?.[0]?.boardId }))
    @ApiCreatedResponse({ description: "Nodes successfully created", type: [NodeApiType] })
    public async createMany(@Body() dtos: CreateNodeDto[]) {
        return await this.nodesService.createMany(dtos);
    }

    @Get(":boardId")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: "Nodes founded", type: [NodeApiType] })
    public async findAll(@Param("boardId") boardId: string) {
        return await this.nodesService.findAll(boardId);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    @Validation(z.object(ReplaceAnyNodeZodSchema))
    @BoardCreator(request => ({ id: request?.body?.boardId }))
    @ApiOkResponse({ description: "Node successfully updated" })
    public async replaceOne(@Body() dto: ReplaceNodeDto) {
        return await this.nodesService.replaceOne(dto);
    }

    @Put("bulk")
    @HttpCode(HttpStatus.OK)
    @Validation(z.array(ReplaceAnyNodeZodSchema))
    @BoardCreator(request => ({ id: request?.body?.[0]?.boardId }))
    @ApiOkResponse({ description: "Nodes successfully updated" })
    public async replaceMany(@Body() dtos: ReplaceNodeDto[]) {
        return await this.nodesService.replaceMany(dtos);
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    @Validation(z.object(RemoveOneNodeDtoZodSchema))
    @BoardCreator(request => ({ id: request?.body?.boardId }))
    @ApiNoContentResponse({ description: "Node successfully deleted" })
    public async removeOne(@Body() dto: RemoveOneNodeDto) {
        return await this.nodesService.removeOne(dto.id);
    }

    @Delete("bulk")
    @HttpCode(HttpStatus.NO_CONTENT)
    @Validation(z.object(RemoveManyNodesDtoZodSchema))
    @BoardCreator(request => ({ id: request?.body?.boardId }))
    @ApiNoContentResponse({ description: "Nodes successfully deleted" })
    public async removeMany(@Body() dto: RemoveManyNodesDto) {
        return await this.nodesService.removeMany(dto.ids);
    }
}
