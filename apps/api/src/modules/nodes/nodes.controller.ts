import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { CreateAnyNodeZodSchema, RemoveManyNodesDtoZodSchema, ReplaceAnyNodeZodSchema } from "@repo/common";
import { Authorization } from "src/shared/auth";
import { Validation } from "src/shared/validation";
import z from "zod";
import { BoardCreator } from "../boards/middleware/board-creator.guard";
import { CreateNodeDto } from "./dto/create-node.dto";
import { RemoveManyNodesDto } from "./dto/remove-many-nodes.dto";
import { ReplaceNodeDto } from "./dto/replace-node.dto";
import type { NodesService } from "./nodes.service";
import { NodeApiType } from "./swagger/node.api-type";

@Controller("nodes")
@Authorization()
@ApiTags("cats")
export class NodesController {
    public constructor(private readonly nodesService: NodesService) {}

    @Post("bulk")
    @HttpCode(HttpStatus.CREATED)
    @Validation(z.array(CreateAnyNodeZodSchema))
    @BoardCreator(request => ({ id: request?.body?.[0]?.boardId }))
    @ApiBody({ type: [CreateNodeDto], description: "Nodes data to create" })
    @ApiCreatedResponse({ description: "Nodes successfully created", type: [NodeApiType] })
    public async createMany(@Body() dtos: CreateNodeDto[]) {
        return await this.nodesService.createMany(dtos);
    }

    @Get(":boardId")
    @HttpCode(HttpStatus.OK)
    @BoardCreator(request => ({ id: request?.params?.boardId }))
    @ApiParam({ name: "boardId", description: "Board id to search nodes", format: "uuid" })
    @ApiOkResponse({ description: "Nodes founded", type: [NodeApiType] })
    public async findAll(@Param("boardId") boardId: string) {
        return await this.nodesService.findAll(boardId);
    }

    @Put("bulk")
    @HttpCode(HttpStatus.OK)
    @Validation(z.array(ReplaceAnyNodeZodSchema))
    @BoardCreator(request => ({ id: request?.body?.[0]?.boardId }))
    @ApiBody({ type: [ReplaceNodeDto], description: "Nodes data to replace" })
    @ApiOkResponse({ description: "Nodes successfully updated" })
    public async replaceMany(@Body() dtos: ReplaceNodeDto[]) {
        return await this.nodesService.replaceMany(dtos);
    }

    @Delete("bulk")
    @HttpCode(HttpStatus.NO_CONTENT)
    @Validation(z.object(RemoveManyNodesDtoZodSchema))
    @BoardCreator(request => ({ id: request?.body?.boardId }))
    @ApiBody({ type: RemoveManyNodesDto, description: "Nodes info for deletion" })
    @ApiNoContentResponse({ description: "Nodes successfully deleted" })
    public async removeMany(@Body() dto: RemoveManyNodesDto) {
        return await this.nodesService.removeMany(dto);
    }
}
