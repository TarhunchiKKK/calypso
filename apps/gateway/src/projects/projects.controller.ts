import { QueryValidation, Validation } from "@api/common";
import { ExtractGrpc } from "@api/contracts";
import {
    type DuplicateProjectDto,
    DuplicateProjectDtoZodSchema,
    type FindAllProjectsQuery,
    FindAllProjectsQueryZodSchema,
    type FindOneProjectDto,
    FindOneProjectDtoZodSchema,
    type ProjectFilters,
    type RemoveProjectDto,
    RemoveProjectDtoZodSchema,
    type UpdateProjectDto,
    UpdateProjectDtoZodSchema
} from "@lib/projects";
import { Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post } from "@nestjs/common";
import type { Id, PaginationOptions } from "@repo/common";
import { Authorization } from "src/auth/lib/tokens/security/authorization.decorator";
import { Authorized } from "src/auth/lib/tokens/security/authorized.decorator";
import type { TokenPayload } from "src/auth/lib/tokens/types";
import { ProjectsService } from "./projects.service";

@Controller("projects")
@ExtractGrpc()
@Authorization()
export class ProjectsController {
    public constructor(@Inject(ProjectsService) private projectsService: ProjectsService) {}

    @Post("duplicate")
    @HttpCode(HttpStatus.CREATED)
    public async duplicate(@Authorized() payload: TokenPayload, @Validation(DuplicateProjectDtoZodSchema) dto: DuplicateProjectDto) {
        return await this.projectsService.duplicate(payload, dto);
    }

    @Get("/all")
    @HttpCode(HttpStatus.OK)
    public findAll(@Authorized() payload: TokenPayload, @QueryValidation(FindAllProjectsQueryZodSchema) query: FindAllProjectsQuery) {
        const filters: ProjectFilters = {
            type: query.type,
            own: query.own,
            sortOrder: query.sortOrder
        };

        const pagination: PaginationOptions = {
            count: query.count,
            page: query.page
        };

        return this.projectsService.findAll(payload.id, filters, pagination);
    }

    @Get("/one")
    @HttpCode(HttpStatus.OK)
    public findOne(@Authorized() payload: TokenPayload, @Validation(FindOneProjectDtoZodSchema) dto: FindOneProjectDto) {
        return this.projectsService.findOne(payload.id, dto);
    }

    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    public update(@Param("id") id: Id, @Authorized() payload: TokenPayload, @Validation(UpdateProjectDtoZodSchema) dto: UpdateProjectDto) {
        return this.projectsService.update(id, payload.id, dto);
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    public remove(@Authorized() payload: TokenPayload, @Validation(RemoveProjectDtoZodSchema) dto: RemoveProjectDto) {
        return this.projectsService.remove(payload.id, dto);
    }
}
