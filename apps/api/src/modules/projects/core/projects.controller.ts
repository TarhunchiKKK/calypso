import { Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { Authorization } from "src/modules/auth/basic/security/authorization.decorator";
import { Authorized } from "src/modules/auth/basic/security/authorized.decorator";
import { CreateBoardDtoZodSchema } from "@lib/boards";
import { QueryValidation, Validation } from "src/shared/validation";
import { ProjectFilters, ProjectFiltersZodSchema, type UpdateProjectDto, UpdateProjectDtoZodSchema, type CreateProjectDto } from "@lib/projects";
import { type Id, PaginationOptions, PaginationOptionsZodSchema } from "@lib/common";

@Controller("projects/management")
@Authorization()
export class ProjectsController {
    public constructor(@Inject(ProjectsService) private readonly projectsService: ProjectsService) {}

    @Post()
    public async create(@Authorized("id") creatorId: Id, @Validation(CreateBoardDtoZodSchema) dto: CreateProjectDto) {
        return await this.projectsService.create(creatorId, dto);
    }

    // TODO: Project duplication

    @Get()
    public async findAll(@Authorized("id") userId: Id, @QueryValidation(ProjectFiltersZodSchema.extend(PaginationOptionsZodSchema)) dto: ProjectFilters & PaginationOptions) {
        const filters: ProjectFilters = {
            sortOrder: dto.sortOrder,
            own: dto.own,
            type: dto.type
        };

        const pagination: PaginationOptions = {
            count: dto.count,
            page: dto.page
        };

        return await this.projectsService.findAll(userId, filters, pagination);
    }

    @Get(":projectId")
    public async findOne(@Param("projectId") projectId: Id) {
        return await this.projectsService.findOne(projectId);
    }

    @Patch(":projectId")
    public async update(@Param("projectId") projectId: Id, @Validation(UpdateProjectDtoZodSchema) dto: UpdateProjectDto) {
        return await this.projectsService.update(projectId, dto);
    }

    @Delete(":projectId")
    public async remove(@Param("projectId") projectId: Id) {
        return await this.projectsService.remove(projectId);
    }
}
