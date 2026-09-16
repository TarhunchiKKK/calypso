import { Id } from "@lib/common";
import { Query, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { BaseProjectsHandler } from "./base-projects.handler";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "../entities/project.entity";
import { Repository } from "typeorm";

export class FindOneProjectQuery extends Query<Project> {
    public constructor(public projectId: Id) {
        super();
    }
}

@QueryHandler(FindOneProjectQuery)
export class FindOneProjectQueryHandler extends BaseProjectsHandler implements IQueryHandler<FindOneProjectQuery> {
    public constructor(@InjectRepository(Project) projectsRepository: Repository<Project>) {
        super(projectsRepository);
    }

    public async execute({ projectId }: FindOneProjectQuery) {
        return await this.findProject(projectId);
    }
}
