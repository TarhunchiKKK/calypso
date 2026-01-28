import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { CreateAnyNodeZodSchema, ReplaceAnyNodeZodSchema } from "@repo/common";
import { Validation } from "src/shared/validation";
import z from "zod";
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
    public async createOne(@Body() dto: CreateNodeDto) {
        return await this.nodesService.createOne(dto);
    }

    @Post("/bulk")
    @HttpCode(HttpStatus.CREATED)
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
    public async replaceOne(@Body() dto: ReplaceNodeDto) {
        return await this.nodesService.replaceOne(dto);
    }

    @Put("/bulk")
    @HttpCode(HttpStatus.OK)
    @Validation(z.array(ReplaceAnyNodeZodSchema))
    public async replaceMany(@Body() dtos: ReplaceNodeDto[]) {
        return await this.nodesService.replaceMany(dtos);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    public async removeOne(@Param("id") id: string) {
        return await this.nodesService.removeOne(id);
    }

    @Delete("/bulk/:ids")
    @HttpCode(HttpStatus.NO_CONTENT)
    public async removeMany(@Param("ids") ids: string[]) {
        return await this.nodesService.removeMany(ids);
    }
}
