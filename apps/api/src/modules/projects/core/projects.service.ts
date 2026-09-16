import { Inject, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateProjectCommand } from "./handlers/create-project.handler";
import { Id, PaginationOptions } from "@lib/common";
import { CreateProjectDto, ProjectFilters, UpdateProjectDto } from "@lib/projects";
import { FindAllProjectsQuery } from "./handlers/find-all-projects.handler";
import { FindOneProjectQuery } from "./handlers/find-one-project.handler";
import { UpdateProjectCommand } from "./handlers/update-project.handler";
import { RemoveProjectCommand } from "./handlers/remove-project.handler";

@Injectable()
export class ProjectsService {
    public constructor(
        @Inject(CommandBus) private readonly commandBus: CommandBus,
        @Inject(QueryBus) private readonly queryBus: QueryBus
    ) {}

    public async create(creatorId: Id, dto: CreateProjectDto) {
        return await this.commandBus.execute(new CreateProjectCommand(creatorId, dto));
    }

    public async findAll(userId: Id, filters: ProjectFilters, pagination: PaginationOptions) {
        return await this.queryBus.execute(new FindAllProjectsQuery(userId, filters, pagination));
    }

    public async findOne(projectId: Id) {
        return await this.queryBus.execute(new FindOneProjectQuery(projectId));
    }

    public async update(projectId: Id, dto: UpdateProjectDto) {
        return await this.commandBus.execute(new UpdateProjectCommand(projectId, dto));
    }

    public async remove(projectId: Id) {
        return await this.commandBus.execute(new RemoveProjectCommand(projectId));
    }
}
