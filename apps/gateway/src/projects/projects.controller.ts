import { Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post } from "@nestjs/common";
import { Validation } from "@repo/api";
import type { Id } from "@repo/common";
import { ExtractGrpc } from "@repo/contracts";
import {
    type DuplicateProjectDto,
    DuplicateProjectDtoZodSchema,
    type FindOneProjectDto,
    FindOneProjectDtoZodSchema,
    type RemoveProjectDto,
    RemoveProjectDtoZodSchema,
    type UpdateProjectDto,
    UpdateProjectDtoZodSchema
} from "@repo/projects";
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
    public findAll(@Authorized() payload: TokenPayload) {
        return this.projectsService.findAll(payload.id);
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
