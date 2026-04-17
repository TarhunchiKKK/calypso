import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { Validation } from "@repo/api";
import {
    type DuplicateProjectDto,
    DuplicateProjectDtoZodSchema,
    type FindOneProjectDto,
    FindOneProjectDtoZodSchema,
    type Id,
    type RemoveProjectDto,
    RemoveProjectDtoZodSchema,
    type UpdateProjectDto,
    UpdateProjectDtoZodSchema
} from "@repo/common";
import { Authorization } from "src/auth/lib/tokens/security/authorization.decorator";
import { Authorized } from "src/auth/lib/tokens/security/authorized.decorator";
import type { TokenPayload } from "src/auth/lib/tokens/types";
import { ProjectsService } from "./projects.service";

@Controller("projects")
@Authorization()
export class ProjectsController {
    public constructor(@Inject(ProjectsService) private projectsService: ProjectsService) {}

    @Post("duplicate")
    @Validation(DuplicateProjectDtoZodSchema)
    public async duplicate(@Authorized() payload: TokenPayload, @Body() dto: DuplicateProjectDto) {
        return await this.projectsService.duplicate(payload, dto);
    }

    @Get("/all")
    public findAll(@Authorized() payload: TokenPayload) {
        return this.projectsService.findAll(payload.id);
    }

    @Get("/one")
    @Validation(FindOneProjectDtoZodSchema)
    public findOne(@Authorized() payload: TokenPayload, @Body() dto: FindOneProjectDto) {
        return this.projectsService.findOne(payload.id, dto);
    }

    @Patch(":id")
    @Validation(UpdateProjectDtoZodSchema)
    public update(@Param("id") id: Id, @Authorized() payload: TokenPayload, @Body() dto: UpdateProjectDto) {
        this.projectsService.update(id, payload.id, dto);
    }

    @Delete()
    @Validation(RemoveProjectDtoZodSchema)
    public remove(@Authorized() payload: TokenPayload, @Body() dto: RemoveProjectDto) {
        this.projectsService.remove(payload.id, dto);
    }
}
