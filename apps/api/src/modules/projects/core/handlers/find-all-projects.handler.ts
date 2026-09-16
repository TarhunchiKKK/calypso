import { Id, PaginationOptions } from "@lib/common";
import { ProjectFilters } from "@lib/projects";
import { Query, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "../entities/project.entity";
import { Repository } from "typeorm";

export class FindAllProjectsQuery extends Query<Project[]> {
    public constructor(
         public userId: Id,
        public filters: ProjectFilters,
        public pagination: PaginationOptions
    ) {
        super()
    }
}

@QueryHandler(FindAllProjectsQuery)
export class FindAllProjectsQueryHandler implements IQueryHandler<FindAllProjectsQuery> {
    public constructor(@InjectRepository(Project) private readonly projectsRepository: Repository<Project>) {}

    public async execute({ userId,filters,pagination }: FindAllProjectsQuery) {
        return await this.projectsRepository.find({
             where: {
                // TODO: add search by creatorId (userId - access for me, creatorId - board creator)
                creator: {
                    id: filters.own ? userId : undefined
                }
            },
            skip: pagination.page * pagination.count,
            take: pagination.count,
            order: {
                title: filters.sortOrder === "alphabetic" ? "ASC" : undefined,
                createdAt: filters.sortOrder === "last-created" ? "DESC" : undefined,
                updatedAt: filters.sortOrder === "last-modified" ? "DESC" : undefined
            }
        })
    }
}